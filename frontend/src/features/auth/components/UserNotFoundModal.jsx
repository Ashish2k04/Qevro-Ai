import { UserX } from 'lucide-react';
import { Link } from 'react-router';

const UserNotFoundModal = ({ email, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-gray-900 border border-gray-700
        shadow-2xl p-8 text-center"
        style={{ animation: 'modalIn 0.25s ease' }}
      >
        {/* Glow decorations */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="relative w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-5">
          <UserX size={30} className="text-indigo-400" />
        </div>

        {/* Logo */}
        <p className="text-sm font-semibold tracking-tight text-white mb-1">
          Qevro<span className="text-indigo-400">Ai.</span>
        </p>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-white tracking-tight mt-3 mb-2">
          No account found
        </h2>

        {/* Body */}
        <p className="text-sm text-gray-300 leading-relaxed mb-2">
          No account exists with this email. You have to make an account first.
        </p>
        {email && (
          <p className="text-sm font-medium text-indigo-400 mb-6 truncate">
            {email}
          </p>
        )}

        {/* Register Button */}
        <Link
          to="/register"
          onClick={onClose}
          className="w-full h-11 rounded-lg bg-indigo-600 text-white text-sm font-medium
          flex items-center justify-center cursor-pointer transition-all duration-200
          hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] mb-3"
        >
          Create an account
        </Link>

        {/* Cancel / Close button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full text-xs text-gray-400 hover:text-gray-200 transition-colors py-1 cursor-pointer"
        >
          Close
        </button>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
};

export default UserNotFoundModal;
