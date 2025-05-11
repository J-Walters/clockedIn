const formEl = document.querySelector('#form');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const savedList = document.getElementById('saved-list');

let savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.tab;
    tabPanels.forEach((panel) => panel.classList.add('hidden'));
    document.getElementById(`${selected}-tab`).classList.remove('hidden');
  });
});

renderSavedList(savedSearches);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const dataObject = Object.fromEntries(data.entries());

  const queryParams = Object.entries(dataObject)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  const searchUrl = `https://www.linkedin.com/jobs/search/?${queryParams}`;

  window.open(searchUrl, '_blank');

  const searchEntry = {
    title: dataObject.keywords || 'Untitled Search',
    time: decodeTimeFrame(dataObject.f_TPR),
    distance: dataObject.distance || 'N/A',
    url: searchUrl,
  };

  savedSearches.push(searchEntry);
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  renderSavedList(savedSearches);
});

function renderSavedList(list) {
  savedList.innerHTML = '';

  if (!list.length) {
    savedList.innerHTML = '<p>No saved searches yet.</p>';
    return;
  }

  [...list].reverse().forEach((item, index) => {
    const el = document.createElement('li');
    el.className = 'saved-card';
    el.innerHTML = `
    <div class="text">
      <strong>${item.title}</strong>
      <div class="subtext">${item.time} • within ${item.distance} miles</div>
    </div>
    <button class="delete-btn" data-index="${index}">&times;</button>
  `;
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        savedSearches.splice(index, 1);
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
        renderSavedList(savedSearches);
      } else {
        window.open(item.url, '_blank');
      }
    });
    savedList.appendChild(el);
  });
}

function decodeTimeFrame(value) {
  const map = {
    r1800: 'Past 30 minutes',
    r3600: 'Past hour',
    r7200: 'Past 2 hours',
    r86400: 'Past 24 hours',
  };
  return map[value] || 'Recent';
}

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
