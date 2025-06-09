/* global chrome */
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';

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
  const { user } = useAuth();
  const [form, setFormData] = useState({
    title: '',
    time: 'r1800',
    distance: 25,
    sortBy: 'DD',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buildLinkedInSearchUrl = ({ title, time, distance, sortBy }) => {
    const base = 'https://www.linkedin.com/jobs/search/';
    const params = new URLSearchParams({
      keywords: title,
      f_TPR: time,
      sortBy,
      distance: distance,
      //hard coded for nyc metropolitan area
      geoId: '90000070',
    });
    return `${base}?${params.toString()}`;
  };

  const handleLiveSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const searchUrl = buildLinkedInSearchUrl(form);

    const searchEntry = {
      title: form.title,
      time: decodeTimeFrame(form.time),
      distance: form.distance || 25,
      url: searchUrl,
      sort_by: form.sortBy,
    };

    try {
      if (user) {
        const { data, error } = await supabase
          .from('saved_searches')
          .insert([{ ...searchEntry, user_id: user.id }])
          .select();

        if (error) throw new Error(error.message);

        setSavedSearches((prev) => [...prev, data[0]]);
      } else {
        const updatedSearch = [...savedSearches, searchEntry];
        localStorage.setItem('savedSearches', JSON.stringify(updatedSearch));
        setSavedSearches(updatedSearch);
      }

      chrome.tabs.create({ url: searchUrl });
      window.close();

      setFormData({
        title: '',
        time: 'r1800',
        distance: 25,
        sortBy: 'DD',
      });
    } catch (error) {
      console.error('Error completing search', error);
      setError('Couldn’t save your search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <form id='form' onSubmit={handleLiveSearch}>
        <label htmlFor='keywords'>Keywords:</label>
        <input
          type='text'
          id='keywords'
          placeholder='e.g., Software Engineer'
          name='keywords'
          autoFocus
          required
          value={form.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label htmlFor='distance'>Search Radius (miles):</label>
        <input
          type='number'
          id='distance'
          min='0'
          placeholder='25'
          name='distance'
          value={form.distance}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, distance: e.target.value }))
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
        {error && <div className='error-message'>{error}</div>}
        <button className='search-button' type='submit' disabled={loading}>
          {loading ? 'Searching…' : 'Go to LinkedIn'}
        </button>
      </form>
    </div>
  );
}
