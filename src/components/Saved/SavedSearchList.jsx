import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';
import SavedSearchCard from './SavedSearchCard';

export default function SavedSearchList({ savedSearches, setSavedSearches }) {
  const { user } = useAuth();

  const handleSearchClick = (search) => {
    window.open(search.url, '_blank');
  };

  const handleDeleteSearch = async (searchToDelete) => {
    const previous = [...savedSearches];
    const updated = previous.filter((s) => s.id !== searchToDelete.id);

    setSavedSearches(updated);

    try {
      if (user) {
        const { error } = await supabase
          .from('saved_searches')
          .delete()
          .eq('id', searchToDelete.id);
        if (error) throw new Error(error.message);
      } else {
        localStorage.setItem('savedSearches', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Failed to delete:', err);

      setSavedSearches(previous);
    }
  };

  const renderedSearches = [...savedSearches].reverse().map((search) => {
    return (
      <SavedSearchCard
        key={search.id}
        search={search}
        handleSearchClick={handleSearchClick}
        handleDeleteSearch={handleDeleteSearch}
        handleSave={(updated) =>
          setSavedSearches((prev) => {
            const withoutOld = prev.filter((item) => item.id !== updated.id);
            return [...withoutOld, updated];
          })
        }
      />
    );
  });

  return (
    <>
      {savedSearches.length > 0 ? (
        <ul id='saved-list'>{renderedSearches}</ul>
      ) : (
        <p id='empty-search-list'>No saved searches</p>
      )}
    </>
  );
}
