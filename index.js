const formEl = document.querySelector('#form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const dataObject = Object.fromEntries(data.entries());

  let sentence = 'https://www.linkedin.com/jobs/search-results/?';

  for (const prop in dataObject) {
    sentence += `${prop}=${encodeURIComponent(dataObject[prop])}&`;
  }

  sentence = sentence.slice(0, -1);

  chrome.tabs.create({ url: sentence });
});

// Here's a breakdown of the key parameters in a LinkedIn Job Search URL:
// https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=4225459777&distance=25&f_E=1%2C2%2C3&f_TPR=a1746746324-&geoId=90000070&keywords=software%20engineer&origin=JOB_SEARCH_PAGE_JOB_FILTER&sortBy=DD&spellCorrectionEnabled=true&start=75
// https://www.linkedin.com/jobs/search-results/?f_TPR=r86400&keywords=software%20engineer

// distance: Controls the job search radius in miles. Example: distance=50 (search within 50 miles).
// f_TPR: Filters job postings by recency.
// r3600 - Jobs posted within the last hour.
// r86400 - Jobs posted within the last 24 hours.
// r604800 - Jobs posted within the last week.
// r2592000 - Jobs posted within the last month.
// geoId: Specifies the geographic location. Example: If searching for jobs in Florida, you need the geoId for Florida.
// keywords: Determines the job title or keywords being searched. %20 represents spaces.
// Example: keywords=senior%20operations%20manager (searches for “Senior Operations Manager”).
// Example: keywords=Director%20of%20Operations (searches for “Director of Operations”).
// location: Defines the search location. Example: location=Florida.
// origin: Indicates that the search is being filtered from the job search page. (You can ignore this.)
// sortBy: Sorts results. Options: R (Relevance), DD (Date posted).
