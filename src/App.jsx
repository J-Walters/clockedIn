import { mock } from 'node:test';
import { useState } from 'react';

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
  const [savedSearches, setSavedSearches] = useState(mockSavedSearches);

  const handleClick = (item) => {
    window.open(item.url, '_blank');
  };

  const handleDelete = (item) => {
    setSavedSearches((prevSearches) => {
      return prevSearches.filter((search) => {
        return search.url !== item.url;
      });
    });
  };

  const list = savedSearches.map((item) => {
    return (
      <li key={item.url} className='saved-card'>
        <div onClick={() => handleClick(item)} className='text'>
          <strong>{item.title}</strong>
          <div className='subtext'>
            {item.time} • within {item.distance} miles
          </div>
        </div>
        <button
          onClick={() => handleDelete(item)}
          className='delete-btn'
          data-url={item.url}
        >
          &times;
        </button>
      </li>
    );
  });

  return (
    <>
      {savedSearches.length > 0 ? (
        <ul id='saved-list'>{list}</ul>
      ) : (
        <p>No saved searches</p>
      )}
    </>
  );
}

export default App;
