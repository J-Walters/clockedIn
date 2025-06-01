import { useState, useEffect } from 'react';

const mockSavedSearches = [
  {
    title: 'Remote React Roles in NYC',
    url: 'https://www.linkedin.com/jobs/search/?keywords=React&location=New%20York%20City&f_TPR=r3600',
    time: 'Past hour',
    distance: '50',
  },
  {
    title: 'Product Design Roles – Remote',
    url: 'https://www.linkedin.com/jobs/search/?keywords=Product%20Designer&f_TPR=r86400',
    time: 'Past 24 hours',
    distance: '25',
  },
  {
    title: 'Frontend Internships',
    url: 'https://www.linkedin.com/jobs/search/?keywords=Frontend%20Intern&f_TPR=r7200',
    time: 'Past 2 hours',
    distance: '25',
  },
];

function App() {
  const [savedSearches, setSavedSearches] = useState(() =>
    JSON.parse(localStorage.getItem('savedSearches') || [])
  );

  useEffect(() => {
    localStorage.setItem('savedSearches', JSON.stringify(mockSavedSearches));
    // comment in when done with mock data
    // localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    // }, [savedSearches]);
  }, []);

  const handleSearchClick = (search) => {
    window.open(search.url, '_blank');
  };

  const handleDeleteSearch = (searchToDelete) => {
    setSavedSearches((prev) => {
      return prev.filter((search) => {
        return search.url !== searchToDelete.url;
      });
    });
  };

  const renderedSearches = savedSearches.map((search) => {
    return (
      <li key={search.url} className='saved-card'>
        <div onClick={() => handleSearchClick(search)} className='text'>
          <strong>{search.title}</strong>
          <div className='subtext'>
            {search.time} • within {search.distance} miles
          </div>
        </div>
        <button
          onClick={() => handleDeleteSearch(search)}
          className='delete-btn'
          data-url={search.url}
        >
          &times;
        </button>
      </li>
    );
  });

  return (
    <>
      {savedSearches.length > 0 ? (
        <ul id='saved-list'>{renderedSearches}</ul>
      ) : (
        <p>No saved searches</p>
      )}
    </>
  );
}

export default App;
