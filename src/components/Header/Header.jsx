import Login from './Login';

export default function Header({ signedIn, setSignedIn }) {
  return (
    <header>
      <Login signedIn={signedIn} setSignedIn={setSignedIn} />
      <h1>ClockedIn</h1>
    </header>
  );
}
