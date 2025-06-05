/* global chrome */
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../supabase-client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check user on load + subscribe to auth changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async function signUpWithEmail(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async function signInWithGoogle() {
    const manifest = chrome.runtime.getManifest();
    const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org`;
    const url = new URL('https://accounts.google.com/o/oauth2/auth');

    url.searchParams.set('client_id', manifest.oauth2.client_id);
    url.searchParams.set('response_type', 'id_token');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', manifest.oauth2.scopes.join(' '));

    return new Promise((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        { url: url.href, interactive: true },
        async (redirectedTo) => {
          if (chrome.runtime.lastError || !redirectedTo) {
            return reject(
              chrome.runtime.lastError || new Error('OAuth failed')
            );
          }

          const finalUrl = new URL(redirectedTo);
          const params = new URLSearchParams(finalUrl.hash.substring(1));
          const idToken = params.get('id_token');

          if (!idToken) return reject(new Error('Missing ID token'));

          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
          });

          if (error) return reject(error);
          resolve(data);
        }
      );
    });
  }

  function signOut() {
    supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
