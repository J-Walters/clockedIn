import AddSearchForm from './AddSearchForm';
import SavedSearchList from './SavedSearchList';

export default function Saved({ savedSearches, setSavedSearches }) {
  return (
    <>
      <AddSearchForm
        savedSearches={savedSearches}
        setSavedSearches={setSavedSearches}
      />
      <SavedSearchList
        savedSearches={savedSearches}
        setSavedSearches={setSavedSearches}
      />
    </>
  );
}
