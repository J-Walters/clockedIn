import { useState } from 'react';

export default function AddNewSearch() {
  const [visible, setVisible] = useState(true);
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || [])
  );

  const handleClick = () => {
    setVisible(!visible);
  };

  const formAction = (formData) => {
    console.log(formData.get('title'));
    const title = formData.get('title');
    const url = formData.get('url');
    const time = formData.get('time');
    const distance = formData.get('distance');

    const newSearchObject = { title, url, time, distance };
    const updated = [...savedSearches, newSearchObject];
    localStorage.setItem('savedSearches', JSON.stringify(updated));

    setVisible(!visible);
  };

  return (
    <>
      {visible ? (
        <div className='add-new-wrapper'>
          <button onClick={handleClick} className='secondary-button'>
            Add New
          </button>
        </div>
      ) : (
        <form action={formAction}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type='text'
              name='title'
              placeholder='Search Title'
              required
            />
            <div class='input-with-button'>
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
            <button type='submit' class='search-button'>
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
}
