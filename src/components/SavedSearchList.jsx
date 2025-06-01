import SavedSearchCard from './SavedSearchCard';

export default function SavedSearchList({ savedSearches, setSavedSearches }) {
  const handleSearchClick = (search) => {
    window.open(search.url, '_blank');
  };

  // will need to update with ids eventually
  const handleDeleteSearch = (searchToDelete) => {
    const updatedSearches = savedSearches.filter(
      (search) => search.url !== searchToDelete.url
    );

    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
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
