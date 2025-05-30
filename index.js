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

  [...list].reverse().forEach((item) => {
    const el = document.createElement('li');
    el.className = 'saved-card';
    el.innerHTML = `
      <div class="text">
        <strong>${item.title}</strong>
        <div class="subtext">${item.time} • within ${item.distance} miles</div>
      </div>
      <button class="delete-btn" data-url="${item.url}">&times;</button>
    `;

    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const url = e.target.getAttribute('data-url');
        savedSearches = savedSearches.filter((search) => search.url !== url);
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
