import { TrashSimple, PencilSimple } from 'phosphor-react';

export default function SavedSearchCard({
  search,
  handleSearchClick,
  handleDeleteSearch,
}) {
  return (
    <li className='saved-card'>
      <div onClick={() => handleSearchClick(search)} className='text'>
        <strong>{search.title}</strong>
        <div className='subtext'>
          {search.time} • within {search.distance} miles
        </div>
      </div>
      <button
        onClick={() => handleDeleteSearch(search)}
        className='delete-btn'
        data-url={search.url}
      >
        <TrashSimple size={16} color='#94423e' />
      </button>
      <PencilSimple size={16} color='#874a21' weight='duotone' />
    </li>
  );
}
