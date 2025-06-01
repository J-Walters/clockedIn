/*global chrome*/
import { useState } from 'react';

export default function AddNewSearch({ savedSearches, setSavedSearches }) {
  const [showForm, setShowForm] = useState(true);
  const [copied, setCopied] = useState(false);
  const [control, setControl] = useState({
    title: '',
    url: '',
    time: '',
    distance: '',
  });

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const clearForm = () => {
    setControl({
      title: '',
      url: '',
      time: '',
      distance: '',
    });

    setShowForm(!showForm);
  };

  const handleSavedSearch = () => {
    const newSearch = { ...control };

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
    setControl((prev) => ({ ...prev, url: tab.url }));
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
              required
              value={control.title}
              onChange={(e) =>
                setControl((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <div className='input-with-button'>
              <input
                id='url-input'
                type='url'
                name='url'
                placeholder='Search URL'
                required
                value={control.url}
                onChange={(e) =>
                  setControl((prev) => ({ ...prev, url: e.target.value }))
                }
              />
              <button id='copy-button' type='button' onClick={handleCopyLink}>
                {copied ? 'Copied!' : 'Copy From URL'}
              </button>
            </div>
            <select
              name='time'
              value={control.time}
              onChange={(e) =>
                setControl((prev) => ({ ...prev, time: e.target.value }))
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
              value={control.distance}
              onChange={(e) =>
                setControl((prev) => ({ ...prev, distance: e.target.value }))
              }
            />
            <button type='submit' className='search-button'>
              Saved
            </button>
            <button onClick={clearForm} type='button' className='search-button'>
              cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}
