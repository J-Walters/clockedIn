import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login({ closeModal }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ email: '', password: '' });

  const clearForm = () => {
    setForm({ email: '', password: '' });
    setMode('signin');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
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
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      clearForm();
      closeModal();
    } catch (err) {
      console.error('Google sign-in error:', err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleAuth}>
        <h1>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h1>

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          value={form.email}
          autoComplete='username'
          required
          autoFocus
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          value={form.password}
          autoComplete='current-password'
          required
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <button className='search-button' type='submit'>
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center' }}>or</p>

        <button
          className='secondary-button'
          onClick={handleGoogle}
          type='button'
        >
          Sign in with Google
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px' }}>
          {mode === 'signin'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </p>

        <button
          className='cancel-button'
          type='button'
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
        >
          {mode === 'signin' ? 'Create one' : 'Sign In'}
        </button>
      </form>
    </>
  );
}
