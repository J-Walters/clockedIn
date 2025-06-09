import { TrashSimple, PencilSimple, X, Plus } from 'phosphor-react';
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
  const [form, setForm] = useState({
    ...search,
    tags: Array.isArray(search.tags) ? search.tags : [],
  });
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');

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
            {search.tags?.length > 0 && (
              <div className='tag-row static'>
                {search.tags.map((tag, idx) => (
                  <span key={idx} className='tag'>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleDeleteSearch(search)}
            className='delete-btn'
            data-url={search.url}
          >
            <TrashSimple size={16} color='#874a21' />
          </button>
          <button onClick={() => showEdit(true)} className='delete-btn'>
            <PencilSimple size={16} color='#874a21' weight='duotone' />
          </button>
        </>
      ) : (
        <>
          <div className='edit-form'>
            <label>Title</label>
            <input
              autoFocus
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
            <div className='edit-form-row'>
              <div className='half'>
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
              </div>
              <div className='half'>
                <label>Distance</label>
                <input
                  type='number'
                  value={form.distance}
                  onChange={(e) =>
                    setForm({ ...form, distance: e.target.value })
                  }
                />
              </div>
            </div>
            <label>Tags</label>
            <div className='tag-row'>
              {form.tags.map((tag, idx) => (
                <span key={idx} className='tag'>
                  {tag}
                  <button
                    type='button'
                    onClick={() =>
                      setForm({
                        ...form,
                        tags: form.tags.filter((t) => t !== tag),
                      })
                    }
                    className='remove-tag'
                  >
                    <X size={12} weight='bold' />
                  </button>
                </span>
              ))}
              {showTagInput && (
                <div className='tag-input-row'>
                  <input
                    autoFocus
                    type='text'
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder='Add tag'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      if (newTag.trim() && !form.tags.includes(newTag.trim())) {
                        setForm({
                          ...form,
                          tags: [...form.tags, newTag.trim()],
                        });
                        setNewTag('');
                        setShowTagInput(false);
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
              <button
                type='button'
                className='add-tag-button'
                onClick={() => setShowTagInput(true)}
              >
                <Plus size={14} weight='bold' />
              </button>
            </div>
            <div className='edit-form-buttons'>
              <button className='save-edit-button' onClick={handleEdit}>
                save
              </button>
              <button
                className='cancel-edit-button'
                onClick={() => showEdit(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
}
