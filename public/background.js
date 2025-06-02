/*global chrome*/
// import supabase from './supabase-client';
const STORAGE_KEY = 'inputKey';

async function checkAlarmState() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const { enabled, frequency } = result[STORAGE_KEY] || {};

  const numericFrequency = Number(frequency);

  if (enabled && numericFrequency) {
    const alarm = await chrome.alarms.get(STORAGE_KEY);

    if (!alarm) {
      await chrome.alarms.create(STORAGE_KEY, {
        periodInMinutes: numericFrequency,
      });
    }
  }
}

checkAlarmState();

chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'extension-logo.png',
    title: 'Time to check for jobs!',
    message: 'Don’t forget to run your ClockedIn search today!',
    silent: false,
  });
});

chrome.runtime.onStartup.addListener(checkAlarmState);
chrome.runtime.onInstalled.addListener(checkAlarmState);

// const clientId =
//   '62030700716-hlv1t5vv6pomukgllm9n5acm85u82fg5.apps.googleusercontent.com';
// const redirectUri = chrome.identity.getRedirectURL('google');

// // This opens a Google sign-in page
// chrome.identity.launchWebAuthFlow(
//   {
//     url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=id_token&redirect_uri=${redirectUri}&scope=profile%20email&nonce=random_string`,
//     interactive: true,
//   },
//   async (redirectUrl) => {
//     if (chrome.runtime.lastError || !redirectUrl) {
//       console.error('OAuth failed:', chrome.runtime.lastError);
//       return;
//     }

//     // Extract ID token from the URL fragment
//     const url = new URL(redirectUrl);
//     const idToken = url.hash.match(/id_token=([^&]*)/)[1];

//     // Now log in to Supabase
//     const { data, error } = await supabase.auth.signInWithIdToken({
//       provider: 'google',
//       token: idToken,
//     });

//     if (error) {
//       console.error('Supabase sign-in error:', error);
//     } else {
//       console.log('Signed in!', data);
//     }
//   }
// );
