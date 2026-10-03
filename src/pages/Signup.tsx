import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { auth, db, isFirebaseConfigured } from '../firebase';

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/account" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signup(email, password);
      // Save the display name as a profile document. auth.currentUser is set
      // synchronously right after signup resolves.
      if (db && auth?.currentUser) {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          name,
          email,
          createdAt: serverTimestamp(),
        });
      }
      navigate('/account');
    } catch {
      setError('Could not create your account. That email may already be in use.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-5 py-28">
      <h1 className="font-display text-3xl mb-2">Create an Account</h1>
      <p className="text-ink-light text-sm mb-8">
        Already have one? <Link to="/login" className="text-clay underline">Sign in</Link>.
      </p>

      {!isFirebaseConfigured() && (
        <p className="text-sm bg-marigold/20 border border-marigold rounded-sm px-4 py-3 mb-6">
          Firebase isn't configured yet, so account creation won't work until a real project is
          connected.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 bg-white/60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 bg-white/60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ink/20 rounded-sm px-4 py-2.5 bg-white/60"
          />
        </div>
        {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-pine text-stone font-semibold px-6 py-3 rounded-full hover:bg-pine-dark transition-colors disabled:opacity-40"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
