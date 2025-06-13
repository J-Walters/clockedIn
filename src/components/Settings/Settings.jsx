import Notfications from './Notifications';
import ExportCSV from './ExportCSV';
import Profile from './Profile';

export default function Setting({ savedSearches }) {
  return (
    <div
      style={{
        display: ' flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '1rem',
      }}
    >
      <Profile />
      <Notfications />
      <ExportCSV savedSearches={savedSearches} />
    </div>
  );
}
