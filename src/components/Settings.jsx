/*global chrome*/
import { useState, useEffect } from 'react';
import { Bell, Export } from 'phosphor-react';

export default function Setting() {
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['inputKey'], (result) => {
      if (result.inputKey) {
        const { enabled: storedEnabled, frequency: storedFrequency } =
          result.inputKey;
        setEnabled(storedEnabled);
        setFrequency(String(storedFrequency));
      }
    });
  }, []);

  function updateStorage(newValues) {
    chrome.storage.local.set(
      {
        inputKey: {
          enabled,
          frequency,
          ...newValues,
        },
      },
      () => {
        console.log('Chrome storage updated:', {
          enabled,
          frequency,
          ...newValues,
        });
      }
    );
  }

  return (
    <div className='settings-group'>
      <strong className='section-title'>
        <Bell size={16} />
        Notifications
      </strong>
      <label htmlFor='notifications'>Reminder Frequency</label>
      <select
        id='notifications'
        name='notifications'
        value={frequency}
        onChange={(e) => {
          const newFrequency = e.target.value;
          setFrequency(newFrequency);
          updateStorage({ frequency: newFrequency });
        }}
      >
        <option disabled value=''>
          Select a Frequency
        </option>
        <option value='30'>Every 30 Minutes</option>
        <option value='60'>Every Hour</option>
        <option value='120'>Every 2 Hours</option>
        <option value='180'>Every 3 Hours</option>
        <option value='360'>Every 6 Hours</option>
        <option value='720'>Every 12 Hours</option>
        <option value='1440'>Daily</option>
        <option value='2880'>Every 2 Days</option>
      </select>

      <div className='checkbox-wrapper'>
        <input
          id='enabled-checkbox'
          type='checkbox'
          checked={enabled}
          onChange={(e) => {
            const newEnabled = e.target.checked;
            setEnabled(newEnabled);
            updateStorage({ enabled: newEnabled });
          }}
        />
        <label htmlFor='enabled-checkbox'>Enabled</label>
      </div>

      <strong className='section-title'>Saved Searches</strong>
      <a id='export-anchor' className='secondary-button'>
        <Export size={16} color='#874a21' />
        Export saved searches
      </a>
    </div>
  );
}
