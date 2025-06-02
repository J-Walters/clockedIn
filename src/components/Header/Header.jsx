import Login from './Login';

export default function Header({ signedIn }) {
  return (
    <header>
      <Login signedIn={signedIn} />
      <h1>ClockedIn</h1>
    </header>
  );
}
