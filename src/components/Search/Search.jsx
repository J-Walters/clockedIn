import LiveSearchForm from './LiveSearchForm';

export default function Search({ savedSearches, setSavedSearches }) {
  return (
    <LiveSearchForm
      savedSearches={savedSearches}
      setSavedSearches={setSavedSearches}
    />
  );
}
