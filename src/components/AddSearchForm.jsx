/*global chrome*/
import { useState } from 'react';

export default function AddNewSearch({ savedSearches, setSavedSearches }) {
  const [showForm, setShowForm] = useState(true);
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

  const handleSavedSearch = () => {
    const newSearch = { ...form };

    const updatedSearch = [...savedSearches, newSearch];
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearch));

    setSavedSearches((prev) => {
      return [...prev, newSearch];
    });

    clearForm();
  };
  ``;

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
      {showForm ? (
        <div className='add-new-wrapper'>
          <button onClick={handleShowForm} className='secondary-button'>
            Add New
          </button>
        </div>
      ) : (
        <form action={handleSavedSearch}>
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
