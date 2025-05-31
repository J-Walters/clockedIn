/*global chrome*/
const STORAGE_KEY = 'inputKey';

async function checkAlarmState() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const [alarmEnabled, frequency] = result[STORAGE_KEY];

  if (alarmEnabled) {
    const alarm = await chrome.alarms.get(STORAGE_KEY);

    if (!alarm) {
      await chrome.alarms.create(STORAGE_KEY, {
        periodInMinutes: frequency,
      });
    }
  }
}

checkAlarmState();

chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '/assets/icon.png',
    title: 'Time to check for jobs!',
    message: 'Don’t forget to run your ClockedIn search today!',
    silent: false,
  });
});

chrome.runtime.onStartup.addListener(checkAlarmState);
chrome.runtime.onInstalled.addListener(checkAlarmState);
