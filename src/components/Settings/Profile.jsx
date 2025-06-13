import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';

export default function Profile() {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <strong
        className='section-title'
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#5b2e1f',
          marginBottom: '4px',
        }}
      >
        Profile
      </strong>
      <Button variant='search' onClick={handleSignOut} className>
        Sign Out
      </Button>
    </>
  );
}
