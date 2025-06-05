// /*global chrome*/
import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Settings from './components/Settings/Settings';
import Saved from './components/Saved/Saved';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import './components/index.css';

export default function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('search');

  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    if (user) {
      // TODO: fetch from Supabase
      console.log('Logged in as:', user.email);
    } else {
      const existing = localStorage.getItem('savedSearches');
      if (existing) {
        setSavedSearches(JSON.parse(existing));
      }
    }
  }, [user]);

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
            <Settings savedSearches={savedSearches} />
          </section>
        )}
      </main>
    </div>
  );
}
