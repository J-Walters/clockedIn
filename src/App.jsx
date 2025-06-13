import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Settings from './components/Settings/Settings';
import Saved from './components/Saved/Saved';
import Search from './components/Search/Search';
import Header from './components/Header/Header';
import Tabs from './components/Tabs/Tabs';
import supabase from './supabase-client';
import '../index.css';

export default function App() {
  const { user } = useAuth();
  const [savedSearches, setSavedSearches] = useState([]);

  const tabs = [
    {
      id: 'search',
      label: 'Search',
      content: (
        <Search
          savedSearches={savedSearches}
          setSavedSearches={setSavedSearches}
        />
      ),
    },
    {
      id: 'saved',
      label: 'Saved',
      content: (
        <Saved
          savedSearches={savedSearches}
          setSavedSearches={setSavedSearches}
        />
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      content: <Settings />,
    },
  ];

  async function fetchSavedSearches(user) {
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.log('error', error.message, error.details);
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
        setSavedSearches([]);
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
      <main>
        <Tabs tabs={tabs} />
      </main>
    </div>
  );
}
