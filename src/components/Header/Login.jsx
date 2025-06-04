/* global chrome */
import { useState } from 'react';
import supabase from '../../supabase-client';

export default function Login({ setSignedIn, closeModal }) {
  const [mode, setMode] = useState('signin');
  // const [userName, setUserName] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const clearForm = () => {
    setForm({ email: '', password: '' });
    setMode('signin');
  };

  async function signInWithEmail() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      console.log('Sign In data:', data);
      if (error) throw error;

      if (data.user) {
        setSignedIn(true);
        clearForm();
        closeModal();
      }
    } catch (err) {
      console.error('Sign In Error', err);
    }
  }

  async function signUpNewUser() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      console.log('Sign Up data:', data);
      if (error) throw error;

      clearForm();
      setMode('signin');
    } catch (err) {
      console.error('Sign Up Error', err);
    }
  }

  const handleAuth = (e) => {
    e.preventDefault();

    if (mode === 'signin') {
      signInWithEmail();
    } else {
      signUpNewUser();
    }
  };

  const handleGoogleSignIn = async () => {
    const manifest = chrome.runtime.getManifest();
    const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org`;
    const url = new URL('https://accounts.google.com/o/oauth2/auth');
    url.searchParams.set('client_id', manifest.oauth2.client_id);
    url.searchParams.set('response_type', 'id_token');
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', manifest.oauth2.scopes.join(' '));

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
            clearForm();
            closeModal();
          }
        } catch (err) {
          console.error('Sign-in flow error:', err);
        }
      }
    );
  };

  return (
    <>
      <form onSubmit={handleAuth}>
        <h1>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h1>

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          value={form.email}
          autoComplete='username'
          required
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={form.password}
          autoComplete='current-password'
          required
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button type='submit'>
          {mode === 'signin' ? 'Sign In with Email' : 'Create Account'}
        </button>

        <p>or</p>

        <button type='button' onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>

        {mode === 'signin' ? (
          <>
            <p>Don't have an account?</p>
            <button type='button' onClick={() => setMode('signup')}>
              Create one
            </button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button type='button' onClick={() => setMode('signin')}>
              Sign In
            </button>
          </>
        )}
      </form>
    </>
  );
}
