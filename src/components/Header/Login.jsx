import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogo } from 'phosphor-react';
import styles from './Login.module.css';

export default function Login({ closeModal }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearForm = () => {
    setForm({ email: '', password: '' });
    setMode('signin');
    setError('');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signInWithEmail(form.email, form.password);
      } else {
        await signUpWithEmail(form.email, form.password);
        setMode('signin');
        return;
      }
      clearForm();
      closeModal();
    } catch (err) {
      console.error(`${mode} error:`, err.message);
      setError(
        mode === 'signin'
          ? 'Couldn’t sign in. Check your credentials and try again.'
          : 'Couldn’t create account. Please try a different email.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      clearForm();
      closeModal();
    } catch (err) {
      console.error('Google sign in error:', err.message);
      setError('Google sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleAuth} className={styles.authForm}>
        <h1>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h1>
        {error && (
          <div className={styles.errorMessage} role='alert'>
            {error}
          </div>
        )}
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='email@example.com'
          value={form.email}
          autoComplete='username'
          required
          autoFocus
          disabled={loading}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='••••••••'
          value={form.password}
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          required
          disabled={loading}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button
          type='submit'
          className={styles.primaryButton}
          disabled={loading}
        >
          {loading
            ? mode === 'signin'
              ? 'Signing in…'
              : 'Creating…'
            : mode === 'signin'
            ? 'Sign In'
            : 'Create Account'}
        </button>
        <div className={styles.divider}>
          <span>or</span>
        </div>
        <p className={styles.modeSwitch}>
          {mode === 'signin' ? "Don't have an account?" : 'Already have one?'}
          <button
            type='button'
            className={styles.linkButton}
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            disabled={loading}
          >
            {mode === 'signin' ? 'Create one' : 'Sign In'}
          </button>
        </p>
        <p className={styles.altSigninLabel}>Sign in with another option</p>
        <button
          type='button'
          className={styles.secondaryButton}
          onClick={handleGoogle}
          disabled={loading}
        >
          <GoogleLogo size={18} style={{ marginRight: '8px' }} />
          {loading ? 'Please wait…' : 'Sign in with Google'}
        </button>
      </form>
    </>
  );
}
