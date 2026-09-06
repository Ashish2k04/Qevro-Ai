import { Link } from 'react-router'
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {

    const [email, setEmail] = useState('as');
    const [password, setPassword] = useState('ss');
    const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="min-h-screen bg-[#f7f7f5] flex">

      {/* LEFT — Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Qevro<span className="text-indigo-600">Ai.</span>
            </h1>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
              Welcome back
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Log in to continue to your account.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-lg border border-gray-300
                bg-white text-sm text-gray-900 outline-none transition-all
                placeholder:text-gray-400
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={email}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs font-medium text-gray-500
                  hover:text-indigo-600 transition-colors duration-200
                  px-2 py-1 rounded-md hover:bg-indigo-50
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
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-gray-300
                  bg-white text-sm text-gray-900 outline-none transition-all
                  placeholder:text-gray-400
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  value={password}
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
              className="w-full h-12 rounded-lg bg-gray-900 text-white
              text-sm font-medium cursor-pointer
              transition-all duration-200
              hover:bg-indigo-600 hover:scale-[1.02]
              active:scale-[0.98]"
            >
              Log in
            </button>

          </form>

          {/* Register */}
          <div className="flex items-center justify-center gap-2 mt-7">

            <span className="text-sm text-gray-500">
              Haven't registered yet?
            </span>

            <a
              href="#"
              className="inline-flex items-center px-3 py-1.5
              rounded-md border border-gray-200 bg-gray-50
              text-sm font-medium text-gray-700
              hover:bg-indigo-50 hover:border-indigo-200
              hover:text-indigo-600
              transition-all duration-200 cursor-pointer"
            >
              <Link to={'/register'}>Create an account</Link>
            </a>

          </div>

        </div>
      </div>


      {/* RIGHT — Qevro AI */}
      <div
        className="hidden lg:flex w-1/2 m-4 ml-0 rounded-3xl
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

