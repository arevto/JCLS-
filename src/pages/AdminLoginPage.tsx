import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { churchInfo } from '../data/churchData';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onGoBack: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onGoBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  // Check if already authenticated
  useEffect(() => {
    if (authService.isAuthenticated()) {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  // Countdown for lockout
  useEffect(() => {
    if (!lockoutUntil) return;
    const interval = setInterval(() => {
      if (Date.now() >= lockoutUntil) {
        setLockoutUntil(null);
        setAttemptCount(0);
        setError(null);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const getRemainingLockoutSeconds = () => {
    if (!lockoutUntil) return 0;
    return Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Rate limiting: lock after 5 failed attempts for 60 seconds
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setError(`Too many failed attempts. Please wait ${getRemainingLockoutSeconds()} seconds.`);
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await authService.login(username, password);
      if (success) {
        onLoginSuccess();
      } else {
        const newAttempts = attemptCount + 1;
        setAttemptCount(newAttempts);
        if (newAttempts >= 5) {
          const lockUntil = Date.now() + 60 * 1000;
          setLockoutUntil(lockUntil);
          setError('Too many failed attempts. Locked out for 60 seconds.');
        } else {
          setError(`Incorrect username or password. ${5 - newAttempts} attempt(s) remaining.`);
        }
        setPassword('');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = !!(lockoutUntil && Date.now() < lockoutUntil);

  return (
    <div className="min-h-screen bg-[#080a0d] flex flex-col items-center justify-center px-4 py-12">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white text-sm font-medium mb-8 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Website</span>
        </button>

        {/* Card */}
        <div className="bg-[#0f1115] rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-white mb-1">
              Staff Login
            </h1>
            <p className="text-xs text-neutral-400">
              {churchInfo.shortName} — Administration Portal
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-sm mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-username" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading || isLocked}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 disabled:opacity-50 transition"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || isLocked}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 disabled:opacity-50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isLocked || !username.trim() || !password.trim()}
              className="w-full mt-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm tracking-wide transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading
                ? 'Verifying...'
                : isLocked
                ? `Locked (${getRemainingLockoutSeconds()}s)`
                : 'Sign In'}
            </button>
          </form>

          {/* Security notice */}
          <p className="text-center text-xs text-neutral-600 mt-6 leading-relaxed">
            This area is restricted to authorized church staff only.<br />
            Unauthorized access attempts are logged.
          </p>
        </div>
      </div>
    </div>
  );
};
