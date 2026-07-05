import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Lock, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminLogin() {
  const { login, isAuthenticated, checking } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!checking && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError('');
    try {
      await login(password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        className="glass-panel w-full max-w-sm rounded-2xl p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="rounded-xl bg-electric-cyan bg-gradient-to-br from-electric/20 to-cyan/20 border border-white/10 p-3">
            <Lock className="h-6 w-6 text-cyan" aria-hidden="true" />
          </span>
          <h1 className="text-xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-white/50">Sign in to manage portfolio and company details.</p>
        </div>

        <div>
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan/50 focus:outline-none disabled:opacity-50"
          />
        </div>

        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-cyan px-6 py-3 text-sm font-semibold text-white shadow-glow-blue transition-all duration-300 hover:shadow-glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'Sign In'}
        </button>
      </motion.form>
    </div>
  );
}
