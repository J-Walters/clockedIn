// /*global chrome*/
import { useState, useEffect } from 'react';
import Settings from './components/Settings/Settings';
import Saved from './components/Saved/Saved';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import './components/index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || '[]')
  );

  useEffect(() => {
    const existingSearches = localStorage.getItem('savedSearches');
    if (existingSearches) {
      setSavedSearches(JSON.parse(existingSearches));
    }
  }, []);

  return (
    <div className='container'>
      <Header />
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
            <Search
              savedSearches={savedSearches}
              setSavedSearches={setSavedSearches}
            />
          </section>
        )}
        {activeTab === 'saved' && (
          <section class='tab-panel'>
            <Saved
              savedSearches={savedSearches}
              setSavedSearches={setSavedSearches}
            />
          </section>
        )}
        {activeTab === 'settings' && (
          <section class='tab-panel'>
            <Settings savedSearches={savedSearches} setSignedIn={setSignedIn} />
          </section>
        )}
      </main>
    </div>
  );
}
