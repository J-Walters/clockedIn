/*global chrome*/
const STORAGE_KEY = 'inputKey';

async function syncAlarm() {
  try {
    const { [STORAGE_KEY]: settings = {} } = await chrome.storage.local.get(
      STORAGE_KEY
    );
    const enabled = settings.enabled === true;
    const freq = Number(settings.frequency);

    await chrome.alarms.clear(STORAGE_KEY);

    if (enabled && freq > 0) {
      await chrome.alarms.create(STORAGE_KEY, { periodInMinutes: freq });
      console.log(`Alarm set for every ${freq} minutes`);
    } else {
      console.log(
        `Alarm cleared (enabled: ${enabled}, freq: ${settings.frequency})`
      );
    }
  } catch (err) {
    console.error('syncAlarm error', err);
  }
}

chrome.runtime.onInstalled.addListener(syncAlarm);
chrome.runtime.onStartup.addListener(syncAlarm);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.inputKey) {
    syncAlarm();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === STORAGE_KEY) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'extension-logo.png',
      title: 'Time to check for jobs!',
      message: 'Don’t forget to run your ClockedIn search today!',
      silent: false,
    });
  }
});
