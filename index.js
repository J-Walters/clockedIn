const formEl = document.querySelector('#form');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const savedList = document.getElementById('saved-list');
const addNewBtn = document.querySelector('.secondary-button');
const checkbox = document.querySelector('#enabled-checkbox');
const notifSelect = document.querySelector('#notifications');
const exportAnchor = document.querySelector('#export-anchor');

let savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('remindersEnabled');
  const savedValue = localStorage.getItem('reminderFrequency');

  if (saved !== null) {
    checkbox.checked = saved === 'true';
  }

  if (savedValue) {
    notifSelect.value = savedValue;
  }
});

function saveReminderSettings() {
  const isChecked = checkbox.checked;
  const selectedFrequency = notifSelect.value;

  chrome.storage.local.set({ inputKey: [isChecked, selectedFrequency] }, () => {
    console.log('Settings saved to Chrome storage');
  });
}

notifSelect.addEventListener('change', saveReminderSettings);
checkbox.addEventListener('change', saveReminderSettings);

addNewBtn.addEventListener('click', () => {
  const form = document.createElement('form');
  form.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <input type="text" name="title" placeholder="Search Title" required />
      <div class="input-with-button">
        <input id="url-input" type="url" name="url" placeholder="Search URL" required />
        <button id="copy-button" type="button">Copy From URL</button>
      </div>
      <select name="time">
        <option selected disabled hidden value="Date Posted">Date Posted</option>
        <option value="Past 30 minutes">Past 30 minutes</option>
        <option value="Past hour">Past hour</option>
        <option value="Past 2 hours">Past 2 hours</option>
        <option value="Past 24 hours">Past 24 hours</option>
      </select>
      <input type="number" name="distance" placeholder="Distance (miles)" />
      <button type="submit" class="search-button">Save</button>
    </div>
  `;

  const copyBtn = form.querySelector('#copy-button');

  copyBtn.onclick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const urlInput = form.querySelector('#url-input');
    urlInput.value = tab.url;
    copyBtn.textContent = 'Copied!';
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entry = {
      title: data.get('title') || 'Untitled Search',
      url: data.get('url'),
      time: data.get('time') || 'Recent',
      distance: data.get('distance') || 'N/A',
    };

    savedSearches.push(entry);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    renderSavedList(savedSearches);

    addNewBtn.style.display = 'inline-block';
    form.remove();
  });

  savedList.insertBefore(form, savedList.firstChild || null);
  addNewBtn.style.display = 'none';
});

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

function convertToCSV(arr) {
  const headers = Object.keys(arr[0]).join(',');
  const rows = arr.map((obj) =>
    Object.values(obj)
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(',')
  );
  return [headers, ...rows].join('\n');
}

exportAnchor.addEventListener('click', () => {
  const csvData = convertToCSV(savedSearches);
  const csvBlob = new Blob([csvData], { type: 'text/csv' });

  const url = URL.createObjectURL(csvBlob);
  exportAnchor.href = url;
  exportAnchor.download = 'Job Search Data.csv';
});
