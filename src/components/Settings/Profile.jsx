import supabase from '../../supabase-client';

export default function Profile({ setSignedIn }) {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    try {
      if (!error) {
        setSignedIn(false);
      }
    } catch (error) {
      console.error(`Sign out error: ${error}`);
    }
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
