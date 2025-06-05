import Notfications from './Notifications';
import ExportCSV from './ExportCSV';
import Profile from './Profile';

export default function Setting({ savedSearches }) {
  return (
    <div className='settings-group'>
      <Profile />
      <Notfications />
      <ExportCSV savedSearches={savedSearches} />
    </div>
  );
}
