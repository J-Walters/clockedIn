import Notfications from './Notifications';
import ExportCSV from './ExportCSV';

export default function Setting({ savedSearches }) {
  return (
    <div className='settings-group'>
      <Notfications />
      <ExportCSV savedSearches={savedSearches} />
    </div>
  );
}
