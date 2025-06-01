import { useState, useEffect } from 'react';
import LiveSearchForm from './components/LiveSearchForm';
import AddSearchForm from './components/AddSearchForm';
import SavedSearchList from './components/SavedSearchList';
import './components/index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || '[]')
  );

  useEffect(() => {
    const existingSearches = localStorage.getItem('savedSearches');
    if (existingSearches) {
      setSavedSearches(JSON.parse(existing));
    }
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
        {activeTab === 'search' && (
          <section class='tab-panel'>
            <LiveSearchForm
              savedSearches={savedSearches}
              setSavedSearches={setSavedSearches}
            />
          </section>
        )}
        {activeTab === 'saved' && (
          <section class='tab-panel'>
            <AddSearchForm
              savedSearches={savedSearches}
              setSavedSearches={setSavedSearches}
            />
            <SavedSearchList
              savedSearches={savedSearches}
              setSavedSearches={setSavedSearches}
            />
          </section>
        )}
        {activeTab === 'settings' && (
          <section class='tab-panel'>
            <h1>I'm the settings content</h1>
          </section>
        )}
      </main>
    </div>
  );
}
