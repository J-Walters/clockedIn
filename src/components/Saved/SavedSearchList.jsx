import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';
import SavedSearchCard from './SavedSearchCard';

export default function SavedSearchList({ savedSearches, setSavedSearches }) {
  const { user } = useAuth();

  const handleSearchClick = (search) => {
    window.open(search.url, '_blank');
  };

  const handleDeleteSearch = async (searchToDelete) => {
    const updatedSearches = savedSearches.filter(
      (search) => search.id !== searchToDelete.id
    );

    setSavedSearches(updatedSearches);

    if (user) {
      // Delete from Supabase
      const { error } = await supabase
        .from('saved_searches')
        .delete()
        .eq('id', searchToDelete.id);

      if (error) {
        console.error('Failed to delete from Supabase:', error.message);
      }
    } else {
      // Update localStorage for guest users
      localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
    }
  };

  const renderedSearches = savedSearches.reverse().map((search) => {
    return (
      <SavedSearchCard
        key={search.id}
        search={search}
        handleSearchClick={handleSearchClick}
        handleDeleteSearch={handleDeleteSearch}
      />
    );
  });

  return (
    <>
      {savedSearches.length > 0 ? (
        <ul id='saved-list'>{renderedSearches}</ul>
      ) : (
        <p>No saved searches</p>
      )}
    </>
  );
}
