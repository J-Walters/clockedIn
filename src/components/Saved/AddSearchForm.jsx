/*global chrome*/
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';
import styles from './AddSearchForm.module.css';

export default function AddNewSearch({ savedSearches, setSavedSearches }) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    time: '',
    distance: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      url: '',
      time: '',
      distance: null,
    });

    setError('');
    setShowForm(!showForm);
  };

  const handleSavedSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const newSearch = {
      title: formData.title.trim(),
      url: formData.url.trim(),
      time: formData.time,
      distance: formData.distance,
    };

    try {
      if (user) {
        const { data, error } = await supabase
          .from('saved_searches')
          .insert([{ ...newSearch, user_id: user.id }])
          .select();
        if (error) throw new Error(error.message);
        setSavedSearches((prev) => [...prev, data[0]]);
      } else {
        const updated = [...savedSearches, newSearch];
        localStorage.setItem('savedSearches', JSON.stringify(updated));
        setSavedSearches(updated);
      }
      clearForm();
    } catch (error) {
      console.error('Error saving search:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    setFormData((prev) => ({ ...prev, url: tab.url }));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {!showForm ? (
        <div className={styles.addNewWrapper}>
          <button onClick={handleShowForm} className='secondary-button'>
            Add New
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => handleSavedSearch(e)}>
          {error && <p className='error-message'>{error}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type='text'
              name='title'
              placeholder='Search Title'
              autoFocus
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <div className={styles.inputWithButton}>
              <input
                id='url-input'
                type='url'
                name='url'
                placeholder='Search URL'
                required
                value={formData.url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
              />
              <button id='copy-button' type='button' onClick={handleCopyLink}>
                {copied ? 'Copied!' : 'Copy From URL'}
              </button>
            </div>
            <select
              name='time'
              value={formData.time}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, time: e.target.value }))
              }
            >
              <option disabled value=''>
                Date Posted
              </option>
              <option value='r1800'>Past 30 minutes</option>
              <option value='r3600'>Past hour</option>
              <option value='r7200'>Past 2 hours</option>
              <option value='r86400'>Past 24 hours</option>
            </select>
            <input
              type='number'
              name='distance'
              placeholder='Distance (miles)'
              value={formData.distance}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, distance: e.target.value }))
              }
            />
            <div className={styles.buttonRow}>
              <button
                onClick={clearForm}
                className={styles.cancelButton}
                type='button'
              >
                Cancel
              </button>
              <button type='submit' className='search-button'>
                {loading ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
