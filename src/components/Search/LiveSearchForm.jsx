import { useState } from 'react';

function decodeTimeFrame(value) {
  const map = {
    r1800: 'Past 30 minutes',
    r3600: 'Past hour',
    r7200: 'Past 2 hours',
    r86400: 'Past 24 hours',
  };
  return map[value] || 'Recent';
}

export default function LiveSearchForm({ savedSearches, setSavedSearches }) {
  const [signedIn, setSignedIn] = useState(false);
  const [form, setFormData] = useState({
    title: '',
    time: 'r1800',
    distance: '',
    sortBy: 'DD',
  });

  function buildLinkedInSearchUrl({ title, time, sortBy }) {
    const base = 'https://www.linkedin.com/jobs/search/';
    const params = new URLSearchParams({
      keywords: title,
      f_TPR: time,
      sortBy,
    });
    return `${base}?${params.toString()}`;
  }

  const handleLiveSearch = (e) => {
    e.preventDefault();

    const searchUrl = buildLinkedInSearchUrl(form);

    const searchEntry = {
      title: form.title,
      time: decodeTimeFrame(form.time),
      distance: form.distance,
      url: searchUrl,
    };

    const updatedSearch = [...savedSearches, searchEntry];
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearch));
    setSavedSearches(updatedSearch);

    window.open(searchUrl, '_blank');

    setFormData({
      title: '',
      time: 'r1800',
      distance: '',
      sortBy: 'DD',
    });
  };

  return (
    <div className='container'>
      <form id='form' onSubmit={handleLiveSearch}>
        <label htmlFor='radius'>Search Radius (miles):</label>
        <input
          type='number'
          id='radius'
          min='0'
          placeholder='25'
          name='distance'
          value={form.distance}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, distance: e.target.value }))
          }
        />

        <label htmlFor='keywords'>Keywords:</label>
        <input
          type='text'
          id='keywords'
          placeholder='e.g., Software Engineer'
          name='keywords'
          value={form.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <label htmlFor='time-filter'>Filter by Time:</label>
        <select
          id='time-filter'
          name='f_TPR'
          value={form.time}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, time: e.target.value }))
          }
        >
          <option value='r1800'>Past 30 Minutes</option>
          <option value='r3600'>Past Hour</option>
          <option value='r7200'>Past 2 Hours</option>
          <option value='r86400'>Past 24 Hours</option>
        </select>
        <p className='helper-text'>
          Select the time frame to filter job postings.
        </p>

        <label htmlFor='sort'>Sort By:</label>
        <select
          id='sort'
          name='sortBy'
          value={form.sortBy}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value='R'>Relevance</option>
          <option value='DD'>Most Recent</option>
        </select>
        <p className='helper-text'>
          Select how you want the job listings to be sorted.
        </p>

        <button className='search-button' type='submit'>
          Go to LinkedIn
        </button>
      </form>
    </div>
  );
}
