import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hook/useAuth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigate();

    const {handleLogin} = useAuth();

    const submitForm = async (event) => {
      event.preventDefault();
      
      const payload = {
        email,
        password
      }

      const res = await handleLogin(payload)
      console.log(res)
      navigation('/');
}


  return (
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
              className="w-full h-12 rounded-lg bg-indigo-600 text-white
              text-sm font-medium cursor-pointer
              transition-all duration-200
              hover:bg-indigo-500 hover:scale-[1.02]
              active:scale-[0.98]"
            >
              Log in
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
            Send emails, search the web, get up-to-date results,
            and let Qevro-AI handle the work for you.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;