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
  const handleClick = (item) => {
    window.open(item.url, '_blank');
  };

  const list = mockSavedSearches.map((item) => {
    return (
      <li key={item.url}>
        <div onClick={() => handleClick(item)} className='text'>
          <strong>{item.title}</strong>
          <div className='subtext'>
            {item.time} • within {item.distance} miles
          </div>
        </div>
        <button className='delete-btn' data-url={item.url}>
          &times;
        </button>
      </li>
    );
  });

  return (
    <>
      {mockSavedSearches.length > 0 ? (
        <ul id='saved-list'>{list}</ul>
      ) : (
        <p>No saved searches</p>
      )}
    </>
  );
}

export default App;
