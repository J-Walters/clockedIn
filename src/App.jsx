import { useState, useEffect } from 'react';
import LiveSearchForm from './components/LiveSearchForm';
import AddSearchForm from './components/AddSearchForm';
import SavedSearchList from './components/SavedSearchList';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || '[]')
  );

  useEffect(() => {
    const existing = localStorage.getItem('savedSearches');
    if (!existing) {
      localStorage.setItem('savedSearches', JSON.stringify(mockSavedSearches));
      setSavedSearches(mockSavedSearches);
    }
    // Uncomment below to persist changes to savedSearches:
    // localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    // }, [savedSearches]);
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>ClockedIn</h1>
      </header>
      <nav className='tabs'>
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
        <button
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          Saved
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>

      <main>
        {activeTab === 'search' && <LiveSearchForm />}
        {activeTab === 'saved' && (
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
        )}
        {activeTab === 'settings' && <h1>I'm the settings content</h1>}
      </main>
    </div>
  );
}
