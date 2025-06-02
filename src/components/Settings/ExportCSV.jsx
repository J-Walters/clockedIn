import { Export } from 'phosphor-react';

export default function ExportCSV({ savedSearches }) {
  function convertToCSV(data) {
    if (!data.length) return '';

    const keys = Object.keys(data[0]);
    const header = keys.join(',');

    const rows = data.map((row) =>
      keys.map((key) => `"${row[key] || ''}"`).join(',')
    );

    return [header, ...rows].join('\n');
  }

  const handleExport = () => {
    const csvData = convertToCSV(savedSearches);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.download = 'Job Search Data.csv';
    tempLink.click();
  };
  return (
    <>
      <strong className='section-title'>Saved Searches</strong>
      <strong className='section-title'>Saved Searches</strong>
      <button onClick={handleExport} className='secondary-button'>
        <Export size={16} color='#874a21' />
        Export saved searches
      </button>
    </>
  );
}
