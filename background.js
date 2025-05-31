const STORAGE_KEY = 'inputKey';

async function checkAlarmState() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const isEnabled = result[STORAGE_KEY];

  if (isEnabled) {
    const alarm = await chrome.alarms.get(STORAGE_KEY);
    if (!alarm) {
      await chrome.alarms.create(STORAGE_KEY, { periodInMinutes: 1 });
    }
  }
}

checkAlarmState();

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.notifications.create({
    type: 'basic',
    title: 'Time to check for jobs!',
    message: 'Don’t forget to apply to jobs today!',
    silent: false,
  });
});

chrome.runtime.onStartup.addListener(checkAlarmState);
chrome.runtime.onInstalled.addListener(checkAlarmState);
