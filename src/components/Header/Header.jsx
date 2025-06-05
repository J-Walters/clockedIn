import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import Modal from '../Modal';

export default function Header() {
  const { user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);

  // Close modal when user logs in
  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  return (
    <header>
      {!user && (
        <button onClick={() => setShowLogin(true)} className='signin-button'>
          Sign In
        </button>
      )}
      <h1>ClockedIn</h1>
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login closeModal={() => setShowLogin(false)} />
        </Modal>
      )}
    </header>
  );
}
