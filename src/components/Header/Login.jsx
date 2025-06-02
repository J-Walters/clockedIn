/*global chrome*/
import { useState } from 'react';
import supabase from '../../supabase-client';

export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const clearForm = () => {
    setForm({
      email: '',
      password: '',
    });
  };

  async function signUpNewUser() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'j_dubya@icloud.com',
        password: 'example-password123',
      });

      console.log('signedupusers', data);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(`Sign Up ${error}`);
    }
  }

  //email, password sign in
  const signIn = async (formData) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        // email: 'valid.email@supabase.io',
        // password: 'example-password',
      });

      console.log('data', data);
      clearForm();

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Sign In Error', error);
    }
  };

  //google sign in
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

            // setSignedIn(true);
          }
        } catch (err) {
          console.error('Sign-in flow error:', err);
        }
      }
    );
  };

  return (
    <>
      {!showLoginForm ? (
        <>
          <button onClick={() => setShowLoginForm(!showLoginForm)}>
            Sign In
          </button>
        </>
      ) : (
        <div>
          <h1>Sign In</h1>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            value={form.email}
            placeholder='email@email.com'
            autoFocus
            required
            autocomplete='username'
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={form.password}
            placeholder='password'
            required
            autocomplete='password'
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button onClick={() => signIn(form)}>sign in with email</button>
          <p>or</p>
          <button onClick={handleGoogleSignIn}>sign in with google</button>
          <p>don't have an account?</p>
          <button onClick={signUpNewUser}>create one</button>
        </div>
      )}
    </>
  );
}
