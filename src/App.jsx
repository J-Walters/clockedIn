/*global chrome*/
import { useState, useEffect } from 'react';
import Settings from './components/Settings/Settings';
import Saved from './components/Saved/Saved';
import Search from './components/Search/Search';
import './components/index.css';

import supabase from './supabase-client';

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || '[]')
  );
  const [signedIn, setSignedIn] = useState(false);

  const handleGoogleSignIn = async () => {
    const manifest = chrome.runtime.getManifest();
    const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org`;

    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.set('client_id', manifest.oauth2.client_id);
    url.searchParams.set('response_type', 'id_token');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', manifest.oauth2.scopes.join(' '));
    // url.searchParams.set('nonce', Math.random().toString(36).substring(2));

    chrome.identity.launchWebAuthFlow(
      {
        url: url.href,
        interactive: true,
      },
      async (redirectedTo) => {
        if (chrome.runtime.lastError || !redirectedTo) {
          console.error('OAuth failed:', chrome.runtime.lastError);
          return;
        }

        try {
          const finalUrl = new URL(redirectedTo);
          const params = new URLSearchParams(finalUrl.hash.substring(1));
          const idToken = params.get('id_token');

          if (!idToken) {
            throw new Error('ID token not found');
          }

          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
          });

          if (error) {
            console.error('Supabase login error:', error);
          } else {
            console.log('✅ Logged in user:', data.user);

            setSignedIn(true);
          }
        } catch (err) {
          console.error('Sign-in flow error:', err);
        }
      }
    );
  };

  useEffect(() => {
    const existingSearches = localStorage.getItem('savedSearches');
    if (existingSearches) {
      setSavedSearches(JSON.parse(existingSearches));
    }
  }, []);

  return (
    <div className='container'>
      <header>
        {signedIn ? (
          <>
            <p>Hello, Jordan</p>
          </>
        ) : (
          <button onClick={handleGoogleSignIn}>Sign In</button>
        )}
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
