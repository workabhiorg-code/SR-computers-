import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Package,
  Headphones,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ArrowRight,
  KeyRound
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminLogin: () => void;
  onOpenTrackOrder: () => void;
  onOpenContact: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onAdminLogin,
  onOpenTrackOrder,
  onOpenContact
}) => {
  // Session storage or state for logged in user
  const [userSession, setUserSession] = useState<{
    email: string;
    role: 'admin' | 'customer';
  } | null>(() => {
    try {
      const saved = localStorage.getItem('sr_account_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId) {
      setErrorMessage('Please enter your email ID or mobile number.');
      return;
    }

    if (!cleanPass) {
      setErrorMessage('Please enter your password.');
      return;
    }

    // Check for Admin credentials (demo@gmail.com / 1234)
    if (cleanId === 'demo@gmail.com') {
      if (cleanPass === '1234') {
        const session = { email: 'demo@gmail.com', role: 'admin' as const };
        setUserSession(session);
        try {
          localStorage.setItem('sr_account_session', JSON.stringify(session));
        } catch {}

        setSuccessMessage('Admin verified! Launching Admin Portal...');
        setTimeout(() => {
          onClose();
          onAdminLogin();
        }, 500);
        return;
      } else {
        setErrorMessage('Incorrect password for demo@gmail.com. Password is 1234.');
        return;
      }
    }

    // Regular customer login
    const session = { email: cleanId, role: 'customer' as const };
    setUserSession(session);
    try {
      localStorage.setItem('sr_account_session', JSON.stringify(session));
    } catch {}
    setSuccessMessage('Signed in successfully!');
  };

  const handleSignOut = () => {
    setUserSession(null);
    try {
      localStorage.removeItem('sr_account_session');
    } catch {}
    setIdentifier('');
    setPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const fillDemoAdmin = () => {
    setIdentifier('demo@gmail.com');
    setPassword('1234');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          id="account-modal-close-btn"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0055ff] flex items-center justify-center font-bold shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              {userSession ? 'My Account' : 'Account Sign In'}
            </h3>
            <p className="text-xs text-gray-500">
              {userSession
                ? 'Manage your orders, warranties & store access'
                : 'Customer and Store Management Portal'}
            </p>
          </div>
        </div>

        {/* Logged-in View */}
        {userSession ? (
          <div className="space-y-4">
            {/* User Card */}
            <div className={`p-4 rounded-2xl border ${
              userSession.role === 'admin'
                ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Account Status
                </span>
                {userSession.role === 'admin' ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0055ff] text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                    Store Administrator
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    Verified Customer
                  </span>
                )}
              </div>

              <div className="mt-2 text-sm font-black text-gray-900 truncate">
                {userSession.email}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {userSession.role === 'admin'
                  ? 'Full administrative control over inventory, orders, video reviews & store settings.'
                  : 'Track your deliveries, request GST tax invoices, and check product warranties.'}
              </p>
            </div>

            {/* Admin Action: Open Portal */}
            {userSession.role === 'admin' && (
              <button
                onClick={() => {
                  onClose();
                  onAdminLogin();
                }}
                className="w-full py-3 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm"
                id="account-open-admin-btn"
              >
                <Lock className="w-4 h-4 text-cyan-200" />
                <span>Open Store Admin Portal</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}

            {/* Customer Quick Actions */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  onClose();
                  onOpenTrackOrder();
                }}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-800 font-bold flex flex-col items-center gap-1.5 transition text-center"
              >
                <Package className="w-4 h-4 text-[#0055ff]" />
                <span>Track Orders</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-800 font-bold flex flex-col items-center gap-1.5 transition text-center"
              >
                <Headphones className="w-4 h-4 text-green-600" />
                <span>Support & GST</span>
              </button>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 text-xs text-red-600 hover:bg-red-50 font-bold rounded-xl transition flex items-center justify-center gap-1.5 border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>
        ) : (
          /* Sign-in Form */
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Feedback Alerts */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="font-bold">{successMessage}</span>
              </div>
            )}

            {/* Field 1: Email ID or Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Email ID or Mobile Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="e.g. demo@gmail.com or 9658140143"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent transition"
                  id="account-email-input"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Field 2: Password (Placed directly after Email/Mobile Number) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-800">
                  Password *
                </label>
                <span className="text-[10px] text-gray-400 font-medium">
                  Default Demo Admin PIN: 1234
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent transition"
                  id="account-password-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#0055ff] hover:bg-[#0044cc] text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm mt-1"
              id="account-login-submit-btn"
            >
              <span>Sign In / Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Credentials Helper */}
            <div className="pt-3 border-t border-gray-100">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-100 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
                    <KeyRound className="w-3.5 h-3.5 text-[#0055ff]" />
                    <span>Store Admin Credentials:</span>
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="text-[11px] text-[#0055ff] font-bold hover:underline"
                  >
                    Auto-Fill
                  </button>
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-gray-700 space-y-0.5">
                  <div>
                    Email: <span className="font-bold text-gray-900">demo@gmail.com</span>
                  </div>
                  <div>
                    Password: <span className="font-bold text-gray-900">1234</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">
                  Upon entering these credentials, the full Store Admin Portal will open immediately.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
