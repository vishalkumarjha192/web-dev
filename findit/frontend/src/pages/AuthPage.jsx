import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode }) {
  const { user, authenticate } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const isRegister = mode === 'register';
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try { await authenticate(mode, form); } catch (err) { setError(err.message); }
  };

  if (user) return <Navigate to="/" replace />;

  return (
    <form onSubmit={submit} className="box">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      {isRegister && <input name="name" placeholder="Name" value={form.name} onChange={change} required minLength={2} />}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} required minLength={6} />
      {error && <p className="error">{error}</p>}
      <button>{isRegister ? 'Create account' : 'Login'}</button>
    </form>
  );
}
