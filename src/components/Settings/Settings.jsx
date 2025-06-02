import Notfications from './Notifications';
import ExportCSV from './ExportCSV';
import Profile from './Profile';

export default function Setting({ savedSearches, setSignedIn }) {
  return (
    <div className='settings-group'>
      <Profile setSignedIn={setSignedIn} />
      <Notfications />
      <ExportCSV savedSearches={savedSearches} />
    </div>
  );
}
