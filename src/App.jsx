import SavedSearchList from './components/SavedSearchList';
import AddSearchForm from './components/AddSearchForm';
import { useState, useEffect } from 'react';
import './components/index.css';

const mockSavedSearches = [
  {
    title: 'Remote React Roles in NYC',
    url: 'https://www.linkedin.com/jobs/search/?keywords=React&location=New%20York%20City&f_TPR=r3600',
    time: 'Past hour',
    distance: '50',
  },
  {
    title: 'Product Design Roles – Remote',
    url: 'https://www.linkedin.com/jobs/search/?keywords=Product%20Designer&f_TPR=r86400',
    time: 'Past 24 hours',
    distance: '25',
  },
  {
    title: 'Frontend Internships',
    url: 'https://www.linkedin.com/jobs/search/?keywords=Frontend%20Intern&f_TPR=r7200',
    time: 'Past 2 hours',
    distance: '25',
  },
];

function App() {
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || [])
  );

  useEffect(() => {
    const existing = localStorage.getItem('savedSearches');
    if (!existing) {
      localStorage.setItem('savedSearches', JSON.stringify(mockSavedSearches));
      setSavedSearches(mockSavedSearches);
    }
    // comment in when done with mock data
    // localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    // }, [savedSearches]);
  }, []);

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

export default App;
