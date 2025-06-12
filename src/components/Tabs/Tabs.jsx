import { useState } from 'react';
import styles from './Tabs.module.css';

export default function Tabs({ tabs }) {
  const [activeId, setActiveId] = useState(tabs[0].id);

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={
              `${styles.tabBtn} ` +
              (activeId === tab.id ? styles.tabBtnActive : '')
            }
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={
            `${styles.panel} ` + (activeId !== tab.id ? styles.hidden : '')
          }
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
