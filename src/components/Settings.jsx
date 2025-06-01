export default function Setting() {
  return (
    <div class='settings-group'>
      <strong class='section-title'>Notifications</strong>
      <label for='notifications'>Reminder Frequency</label>
      <select id='notifications' name='notifications'>
        <option disabled hidden value='Select a Frequency'>
          Select a Frequency
        </option>
        <option value='60'>Every Hour</option>
        <option value='180'>Every 3 Hours</option>
        <option value='720'>Every 12 Hours</option>
        <option value='1440'>Daily</option>
      </select>
      <div class='checkbox-wrapper'>
        <input id='enabled-checkbox' type='checkbox' />
        <label for='enabled-checkbox'>Enabled</label>
      </div>
      <strong class='section-title'>Saved Searches</strong>
      <a id='export-anchor' class='secondary-button'>
        Export saved searches
      </a>
    </div>
  );
}
