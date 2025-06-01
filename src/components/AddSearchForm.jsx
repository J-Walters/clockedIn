import { useState } from 'react';

export default function AddNewSearch({ savedSearches, setSavedSearches }) {
  const [showForm, setShowForm] = useState(true);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSavedSearch = (formData) => {
    const newSearch = {
      title: formData.get('title'),
      url: formData.get('url'),
      time: formData.get('time'),
      distance: formData.get('distance'),
    };

    const updatedSearch = [...savedSearches, newSearch];
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearch));

    setSavedSearches((prev) => {
      return [...prev, newSearch];
    });

    setShowForm(!showForm);
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
            />
            <div className='input-with-button'>
              <input
                id='url-input'
                type='url'
                name='url'
                placeholder='Search URL'
                required
              />
              <button id='copy-button' type='button'>
                Copy From URL
              </button>
            </div>
            <select name='time'>
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
            />
            <button type='submit' className='search-button'>
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
}
