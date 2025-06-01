import SavedSearchCard from './SavedSearchCard';

export default function SavedSearchList({ savedSearches, setSavedSearches }) {
  const handleSearchClick = (search) => {
    window.open(search.url, '_blank');
  };

  // will need to update with ids eventually
  const handleDeleteSearch = (searchToDelete) => {
    setSavedSearches((prev) => {
      return prev.filter((search) => {
        return search.url !== searchToDelete.url;
      });
    });
  };

  const renderedSearches = savedSearches.map((search) => {
    return (
      <SavedSearchCard
        key={search.url}
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
