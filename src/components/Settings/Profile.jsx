import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <strong className='section-title'>Profile</strong>
      <button onClick={handleSignOut} className='secondary-button'>
        Sign Out
      </button>
    </>
  );
}
