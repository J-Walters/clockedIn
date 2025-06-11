import { TrashSimple, PencilSimple, X, Plus } from 'phosphor-react';
import { useState } from 'react';
import supabase from '../../supabase-client';
import { decodeTimeFrame } from '../../utils/decodeTimeFrame';
import styles from './SavedSearchCard.module.css';

export default function SavedSearchCard({
  search,
  handleSearchClick,
  handleDeleteSearch,
  handleSave,
}) {
  const showSubtext = search.time || search.distance;

  const [edit, showEdit] = useState(false);
  const [form, setForm] = useState({
    ...search,
    tags: Array.isArray(search.tags) ? search.tags : [],
  });
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = async () => {
    setError('');
    setLoading(true);

    let updated = { ...form };

    if (/linkedin\.com\/jobs\/search/.test(updated.url)) {
      try {
        const parsed = new URL(updated.url);
        const params = parsed.searchParams;

        params.set('f_TPR', updated.time);

        if (updated.distance) {
          params.set('distance', updated.distance);
        } else {
          params.delete('distance');
        }

        updated.url = parsed.toString();
      } catch (e) {
        console.warn('Could not parse LinkedIn URL:', updated.url, e);
      }
    }

    try {
      const { error } = await supabase
        .from('saved_searches')
        .update(updated)
        .eq('id', search.id);

      if (error) new Error(error.message);

      handleSave(updated);
      showEdit(false);
    } catch (error) {
      console.error('Error updating search:', error);
      setError('Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className={styles.savedCard}>
      {!edit ? (
        <>
          <div
            onClick={() => handleSearchClick(search)}
            className={styles.text}
          >
            <strong className={styles.text}>{search.title}</strong>
            {showSubtext && (
              <div className={styles.subtext}>
                {decodeTimeFrame(search.time)}
                {decodeTimeFrame(search.time) && search.distance ? ' • ' : ''}
                {search.distance ? `within ${search.distance} miles` : ''}
              </div>
            )}
            {search.tags?.length > 0 && (
              <div className={`${styles.tagRow} static`}>
                {search.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => handleDeleteSearch(search)}
            className={styles.iconButton}
            data-url={search.url}
          >
            <TrashSimple size={16} weight='duotone' />
          </button>
          <button onClick={() => showEdit(true)} className={styles.iconButton}>
            <PencilSimple size={16} weight='duotone' />
          </button>
        </>
      ) : (
        <>
          <div className={styles.editForm}>
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
            <div className={styles.editFormRow}>
              <div className={styles.half}>
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
              <div className={styles.half}>
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
            <div className={styles.tagRow}>
              {form.tags.map((tag, idx) => (
                <span key={idx} className={styles.tag}>
                  {tag}
                  <button
                    type='button'
                    onClick={() =>
                      setForm({
                        ...form,
                        tags: form.tags.filter((t) => t !== tag),
                      })
                    }
                    className={styles.removeTag}
                  >
                    <X size={12} weight='bold' />
                  </button>
                </span>
              ))}
              {showTagInput && (
                <div className={styles.tagInputRow}>
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
                className={styles.addTagButton}
                onClick={() => setShowTagInput(true)}
              >
                <Plus size={14} weight='bold' />
              </button>
            </div>
            {error && <div className='error-message'>{error}</div>}
            <div className={styles.editFormButtons}>
              <button
                className={styles.saveEditButton}
                onClick={handleEdit}
                disabled={loading}
              >
                {loading ? 'saving…' : 'save'}
              </button>
              <button
                className={styles.cancelEditButton}
                onClick={() => showEdit(false)}
                disabled={loading}
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
