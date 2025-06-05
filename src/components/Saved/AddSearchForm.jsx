/*global chrome*/
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';

export default function AddNewSearch({ savedSearches, setSavedSearches }) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setFormData] = useState({
    title: '',
    url: '',
    time: '',
    distance: '',
  });

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const clearForm = () => {
    setFormData({
      title: '',
      url: '',
      time: '',
      distance: '',
    });

    setShowForm(!showForm);
  };

  //for non user logic
  // const handleSavedSearch = () => {
  //   const newSearch = { ...form };

  //   const updatedSearch = [...savedSearches, newSearch];
  //   localStorage.setItem('savedSearches', JSON.stringify(updatedSearch));

  //   setSavedSearches((prev) => {
  //     return [...prev, newSearch];
  //   });

  //   clearForm();
  // };

  const handleSavedSearch = async (e) => {
    e.preventDefault();

    const newSearch = {
      title: form.title,
      url: form.url,
      time: form.time,
      distance: form.distance,
    };

    if (user) {
      // Save to Supabase for signed-in user
      const { data, error } = await supabase
        .from('saved_searches')
        .insert([{ ...newSearch, user_id: user.id }]);

      if (error) {
        console.error('Error saving search:', error.message, error.details);
        return;
      }

      setSavedSearches((prev) => [...prev, data[0]]);
    } else {
      // Save to localStorage for guest
      const updated = [...savedSearches, newSearch];
      localStorage.setItem('savedSearches', JSON.stringify(updated));
      setSavedSearches(updated);
    }

    clearForm();
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
        <div className='add-new-wrapper'>
          <button onClick={handleShowForm} className='secondary-button'>
            Add New
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => handleSavedSearch(e)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type='text'
              name='title'
              placeholder='Search Title'
              autoFocus
              required
              value={form.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <div className='input-with-button'>
              <input
                id='url-input'
                type='url'
                name='url'
                placeholder='Search URL'
                required
                value={form.url}
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
              value={form.time}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, time: e.target.value }))
              }
            >
              <option selected disabled hidden value='Date Posted'>
                Date Posted
              </option>
              <option value='Past 30 minutes'>Past 30 minutes</option>
              <option value='Past hour'>Past hour</option>
              <option value='Past 2 hours'>Past 2 hours</option>
              <option value='Past 24 hours'>Past 24 hours</option>
            </select>
            <input
              type='number'
              name='distance'
              placeholder='Distance (miles)'
              value={form.distance}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, distance: e.target.value }))
              }
            />
            <div className='button-row'>
              <button type='submit' className='search-button'>
                Save
              </button>
              <button
                onClick={clearForm}
                className='cancel-button'
                type='button'
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
