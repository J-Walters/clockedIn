/* global chrome */
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import supabase from '../../supabase-client';
import styles from './LiveSearchForm.module.css';
import Button from '../Button/Button';

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
      time: form.time,
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
    <form className={styles.form} onSubmit={handleLiveSearch}>
      <div className={styles.field}>
        <label htmlFor='keywords' className={styles.label}>
          Keywords:
        </label>
        <input
          id='keywords'
          name='title'
          type='text'
          placeholder='e.g., Software Engineer'
          className={styles.input}
          autoFocus
          required
          value={form.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className={styles.field}>
        <label htmlFor='distance' className={styles.label}>
          Search Radius (miles):
        </label>
        <input
          id='distance'
          name='distance'
          type='number'
          min='0'
          placeholder='25'
          className={styles.input}
          value={form.distance}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, distance: e.target.value }))
          }
        />
      </div>
      <div className={styles.field}>
        <label htmlFor='time-filter' className={styles.label}>
          Filter by Time:
        </label>
        <select
          id='time-filter'
          name='time'
          className={styles.select}
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
        <span className={styles.helper}>
          Select the time frame to filter job postings.
        </span>
      </div>
      <div className={styles.field}>
        <label htmlFor='sort' className={styles.label}>
          Sort By:
        </label>
        <select
          id='sort'
          name='sortBy'
          className={styles.select}
          value={form.sortBy}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value='R'>Relevance</option>
          <option value='DD'>Most Recent</option>
        </select>
        <span className={styles.helper}>
          Select how you want the job listings to be sorted.
        </span>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.buttonWrapper}>
        <Button variant='search' type='submit' disabled={loading}>
          {loading ? 'Searching…' : 'Go to LinkedIn'}
        </Button>
      </div>
    </form>
  );
}
