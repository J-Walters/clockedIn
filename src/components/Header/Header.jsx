import { useState } from 'react';
import Login from './Login';
import Modal from '../Modal';

export default function Header({ signedIn, setSignedIn }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header>
      {!signedIn && <button onClick={() => setShowLogin(true)}>Sign In</button>}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login
            setSignedIn={setSignedIn}
            closeModal={() => setShowLogin(false)}
          />
        </Modal>
      )}

      <h1>ClockedIn</h1>
    </header>
  );
}
