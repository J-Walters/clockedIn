// /*global chrome*/
import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Settings from './components/Settings/Settings';
import Saved from './components/Saved/Saved';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import supabase from './supabase-client';
import './components/index.css';

export default function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('search');
  const [savedSearches, setSavedSearches] = useState([]);

  async function fetchSavedSearches(user) {
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Failed to fetch saved searches:', error);
      return [];
    }

    return data;
  }

  useEffect(() => {
    async function loadSavedSearches() {
      if (user) {
        const data = await fetchSavedSearches(user);
        setSavedSearches(data);
      } else {
        const existing = localStorage.getItem('savedSearches');
        if (existing) {
          setSavedSearches(JSON.parse(existing));
        }
      }
    }

    loadSavedSearches();
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
