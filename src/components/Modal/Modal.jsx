import { createPortal } from 'react-dom';
import { X } from 'phosphor-react';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <X size={16} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
