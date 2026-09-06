import { Link } from 'react-router'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex select-none">

      {/* LEFT — Register */}
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

        {/* Register Content */}
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
              Create your account
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Join Qevro-AI and get started today.
            </p>
          </div>

          {/* Register Form */}
          <form className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full h-12 px-4 rounded-lg border border-gray-700
                bg-white text-sm text-gray-900 outline-none transition-all
                placeholder:text-gray-400
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={name}
                onChange={(val)=>{setName(val.target.value)}}
              />
            </div>

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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
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

            {/* Register Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-indigo-600 text-white
              text-sm font-medium cursor-pointer
              transition-all duration-200
              hover:bg-indigo-500 hover:scale-[1.02]
              active:scale-[0.98]"
            >
              Create account
            </button>

          </form>

          {/* Login */}
          <div className="flex items-center justify-center gap-2 mt-7">

            <span className="text-sm text-gray-400">
              Already have an account?
            </span>

            <Link
              to={'/login'}
              className="text-sm font-medium text-indigo-400
              hover:text-indigo-300
              transition-colors duration-200
              cursor-pointer"
            >
              Log in
            </Link>

          </div>

        </div>
      </div>


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
              is ready for you.
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

export default Register;