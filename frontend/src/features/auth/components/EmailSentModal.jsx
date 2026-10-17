import { Mail } from 'lucide-react';

const EmailSentModal = ({ email, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
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
          <Mail size={30} className="text-indigo-400" />
        </div>

        {/* Logo */}
        <p className="text-sm font-semibold tracking-tight text-white mb-1">
          Qevro<span className="text-indigo-400">Ai.</span>
        </p>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-white tracking-tight mt-3 mb-2">
          Check your inbox
        </h2>

        {/* Body */}
        <p className="text-sm text-gray-400 leading-relaxed mb-1">
          We sent a verification link to
        </p>
        <p className="text-sm font-medium text-indigo-400 mb-5 truncate">
          {email}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed mb-7">
          Click the link in the email to verify your account. If you don&apos;t see it, check your spam folder.
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full h-11 rounded-lg bg-indigo-600 text-white text-sm font-medium
          cursor-pointer transition-all duration-200 hover:bg-indigo-500 hover:scale-[1.02]
          active:scale-[0.98]"
        >
          Got it
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

export default EmailSentModal;
