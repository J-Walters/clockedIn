import { useState, useEffect } from 'react';
import supabase from '../../supabase-client';

export default function Login() {
  const [signedIn, setSignedIn] = useState(false);

  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'valid.email@supabase.io',
        password: 'example-password',
      });

      console.log('data', data);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Sign In Error', error);
    }
  };
  return (
    <>
      <h1>login please</h1>
    </>
  );
}

// <button onClick={signIn}>SIGN IN BUTTON</button>
// {/* {signedIn ? (
//   <>
//     <p>Hello, Jordan</p>
//   </>
// ) : (
//   <button onClick={handleGoogleSignIn} className='secondary-button'>
//     Sign In
//   </button>
// )} */}

//google sign in
// const handleGoogleSignIn = async () => {
// const manifest = chrome.runtime.getManifest();
//   const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org`;

//   const url = new URL('https://accounts.google.com/o/oauth2/auth');
//   url.searchParams.set('client_id', manifest.oauth2.client_id);
//   url.searchParams.set('response_type', 'id_token');
//   url.searchParams.set('access_type', 'offline');
//   url.searchParams.set('redirect_uri', redirectUri);
//   url.searchParams.set('scope', manifest.oauth2.scopes.join(' '));
//   // url.searchParams.set('nonce', Math.random().toString(36).substring(2));

//   chrome.identity.launchWebAuthFlow(
//     {
//       url: url.href,
//       interactive: true,
//     },
//     async (redirectedTo) => {
//       if (chrome.runtime.lastError || !redirectedTo) {
//         console.error('OAuth failed:', chrome.runtime.lastError);
//         return;
//       }

//       try {
//         const finalUrl = new URL(redirectedTo);
//         const params = new URLSearchParams(finalUrl.hash.substring(1));
//         const idToken = params.get('id_token');

//         if (!idToken) {
//           throw new Error('ID token not found');
//         }

//         const { data, error } = await supabase.auth.signInWithIdToken({
//           provider: 'google',
//           token: idToken,
//         });

//         if (error) {
//           console.error('Supabase login error:', error);
//         } else {
//           console.log('✅ Logged in user:', data.user);

//           setSignedIn(true);
//         }
//       } catch (err) {
//         console.error('Sign-in flow error:', err);
//       }
//     }
//   );
// };
