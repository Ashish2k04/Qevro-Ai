import { Link, useNavigate, Navigate } from 'react-router'
import { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import { useSelector } from 'react-redux';

const VerifyEmailModal = ({ email, onClose }) => {
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
          <Mail size={30} className="text-indigo-400" />
        </div>

        {/* Logo */}
        <p className="text-sm font-semibold tracking-tight text-white mb-1">
          Qevro<span className="text-indigo-400">Ai.</span>
        </p>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-white tracking-tight mt-3 mb-2">
          Verify your email
        </h2>

        {/* Body */}
        <p className="text-sm text-gray-300 leading-relaxed mb-2">
          Please verify your email first before logging in.
        </p>
        {email && (
          <p className="text-sm font-medium text-indigo-400 mb-4 truncate">
            {email}
          </p>
        )}
        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          Check your email for the verification link. If you don&apos;t see it, be sure to check your spam folder.
        </p>

        {/* Close button */}
        <button
          type="button"
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

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const navigation = useNavigate();
    const {user, loading} = useSelector(state => state.auth);

    const {handleLogin} = useAuth();

    const submitForm = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
        const payload = { email, password };
        await handleLogin(payload);
        navigation('/');
      } catch (err) {
        if (err.response?.status === 403 || err.response?.data?.message?.toLowerCase().includes('verify')) {
          setShowVerifyModal(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

   if(!loading && user){
    return <Navigate to={'/'}/>
   }

  return (
    <>
      {showVerifyModal && (
        <VerifyEmailModal
          email={email}
          onClose={() => setShowVerifyModal(false)}
        />
      )}

      <div className="min-h-screen bg-[#f7f7f5] flex select-none">

        {/* LEFT — Login */}
        <div
          className="w-full lg:w-1/2 m-4 mr-0 rounded-l-3xl
          bg-gray-900 relative overflow-hidden
        flex items-center justify-center px-6 py-10"
      >

        {/* Background Decoration */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96
          bg-indigo-600/20 rounded-full blur-3xl"
        />

        <div
          className="absolute -bottom-32 -right-32 w-96 h-96
          bg-purple-600/20 rounded-full blur-3xl"
        />

        {/* Login Content */}
        <div className="relative w-full max-w-md">

          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Qevro<span className="text-indigo-400">Ai.</span>
            </h1>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-3xl font-semibold text-white tracking-tight">
              Welcome back
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Log in to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={submitForm}>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-lg border border-gray-700
                bg-white text-sm text-gray-900 outline-none transition-all
                placeholder:text-gray-400
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={email}
                onChange={(val)=>{setEmail(val.target.value)}}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs font-medium text-gray-400
                  hover:text-indigo-400 transition-colors duration-200
                  px-2 py-1 rounded-md hover:bg-indigo-50/10
                  cursor-pointer"
                >
                  Forgot password?
                </a>

              </div>

              {/* Password Input + Eye */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-700
                  bg-white text-sm text-gray-900 outline-none transition-all
                  placeholder:text-gray-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  value={password}
                  onChange={(val)=>{setPassword(val.target.value)}}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-gray-600
                  cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-indigo-600 text-white
              text-sm font-medium cursor-pointer
              transition-all duration-200
              hover:bg-indigo-500 hover:scale-[1.02]
              active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
                </span>
              ) : 'Log in'}
            </button>

          </form>

          {/* Register */}
          <div className="flex items-center justify-center gap-2 mt-7">

            <span className="text-sm text-gray-400">
              Haven't registered yet?
            </span>

            <Link
              to={'/register'}
              className="text-sm font-medium text-indigo-400
              hover:text-indigo-300
              transition-colors duration-200
              cursor-pointer"
            >
              Create an account
            </Link>

          </div>

          {/* Privacy Policy */}
          <div className="flex items-center justify-center mt-4">
            <Link
              to={'/privacy-policy'}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>


      {/* CENTER — Open Book Seam */}
      {/* <div className="hidden lg:block w-[2px] my-4 bg-[#f7f7f5] z-10" /> */}


      {/* RIGHT — Qevro AI */}
      <div
        className="hidden lg:flex w-1/2 m-4 ml-0 rounded-r-3xl
        bg-gray-900 relative overflow-hidden
        items-center justify-center"
      >

        {/* Background Decoration */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96
          bg-indigo-600/20 rounded-full blur-3xl"
        />

        <div
          className="absolute -bottom-32 -left-32 w-96 h-96
          bg-purple-600/20 rounded-full blur-3xl"
        />


        {/* Content */}
        <div className="relative text-center px-10 max-w-xl">

          {/* Main Heading */}
          <h2
            className="text-5xl font-semibold tracking-tight
            text-white leading-tight"
          >
            Qevro-AI
            <br />

            <span className="text-gray-400">
              welcomes you back.
            </span>
          </h2>


          {/* Features */}
          <p
            className="mt-6 text-gray-400 text-sm
            leading-6 max-w-md mx-auto"
          >
            Search the web, get up-to-date results,
            and let Qevro-AI handle the work for you.
          </p>

        </div>
      </div>

    </div>
  </>
);
};

export default Login;