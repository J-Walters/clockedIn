import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCircle } from 'phosphor-react';
import Login from './Login';
import Modal from '../Modal/Modal';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.toolbar} />

      {!user && (
        <button
          onClick={() => setShowLogin(true)}
          className={styles.signin}
          aria-label='Sign in'
        >
          <UserCircle size={16} />
        </button>
      )}

      <h1 className={styles.title}>ClockedIn</h1>

      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login closeModal={() => setShowLogin(false)} />
        </Modal>
      )}
    </header>
  );
}
