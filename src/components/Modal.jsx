import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  return createPortal(
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
