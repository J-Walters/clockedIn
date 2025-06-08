import { TrashSimple, PencilSimple } from 'phosphor-react';
import { useState } from 'react';

import supabase from '../../supabase-client';

export default function SavedSearchCard({
  search,
  handleSearchClick,
  handleDeleteSearch,
  onSave,
}) {
  const showSubtext = search.time || search.distance;

  const [edit, showEdit] = useState(false);
  const [form, setForm] = useState(search);

  const handleEdit = async () => {
    const { error } = await supabase
      .from('saved_searches')
      .update({ ...form })
      .eq('id', search.id);

    if (error) {
      console.error('Error updating search:', error.message);
      return;
    }

    onSave(form);
    showEdit(false);
  };

  return (
    <li className='saved-card'>
      {!edit ? (
        <>
          <div onClick={() => handleSearchClick(search)} className='text'>
            <strong>{search.title}</strong>
            {showSubtext && (
              <div className='subtext'>
                {search.time}
                {search.time && search.distance ? ' • ' : ''}
                {search.distance ? `within ${search.distance} miles` : ''}
              </div>
            )}
          </div>
          <button
            onClick={() => handleDeleteSearch(search)}
            className='delete-btn'
            data-url={search.url}
          >
            <TrashSimple size={16} color='#94423e' />
          </button>
          <PencilSimple
            onClick={() => showEdit(true)}
            size={16}
            color='#874a21'
            weight='duotone'
          />
        </>
      ) : (
        <>
          <div>
            <label>Title</label>
            <input
              type='text'
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <label>URL</label>
            <input
              type='text'
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />

            <label>Time Frame</label>
            <select
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            >
              <option value='r1800'>Past 30 Minutes</option>
              <option value='r3600'>Past Hour</option>
              <option value='r7200'>Past 2 Hours</option>
              <option value='r86400'>Past 24 Hours</option>
            </select>

            <label>Distance</label>
            <input
              type='number'
              value={form.distance}
              onChange={(e) => setForm({ ...form, distance: e.target.value })}
            />
            <button onClick={handleEdit}>save</button>
            <button onClick={() => showEdit(false)}>cancel</button>
          </div>
        </>
      )}
    </li>
  );
}
