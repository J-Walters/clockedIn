/*global chrome*/
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';

export default function Notifications() {
  const { user } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    chrome.storage.local.get(['inputKey'], ({ inputKey }) => {
      if (inputKey) {
        setEnabled(inputKey.enabled);
        setFrequency(String(inputKey.frequency));
      }
    });
  }, []);

  const updateStorage = async (newValues) => {
    const updated = { enabled, frequency, ...newValues };

    // 1) Chrome storage
    try {
      chrome.storage.local.set({ inputKey: updated }, () =>
        console.log('Chrome storage updated:', updated)
      );
    } catch (err) {
      console.error('chrome.storage failure', err);
    }

    // 2) Supabase save (update-then-insert)
    if (!user) return;

    try {
      // a) Try to update existing row, returning the updated rows
      const { data: updateData, error: updateErr } = await supabase
        .from('settings')
        .update({
          frequency: Number(updated.frequency),
          frequency_enabled: updated.enabled,
        })
        .eq('user_id', user.id)
        .select(); // ← this makes `updateData` an array, not null

      if (updateErr) throw updateErr;

      const updatedRows = Array.isArray(updateData) ? updateData : [];

      if (updatedRows.length > 0) {
        console.log('Updated existing settings row');
      } else {
        // b) No rows updated → insert a new one
        const { error: insertErr } = await supabase.from('settings').insert([
          {
            user_id: user.id,
            frequency: Number(updated.frequency),
            frequency_enabled: updated.enabled,
          },
        ]);

        if (insertErr) throw insertErr;
        console.log('Inserted new settings row');
      }
    } catch (err) {
      console.error('Supabase save error:', err.message);
    }
  };

  return (
    <>
      <strong className='section-title'>Notifications</strong>
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
    </>
  );
}
