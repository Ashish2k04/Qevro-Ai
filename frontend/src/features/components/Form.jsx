

const Form = () => {
  return (
    <div>
         <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-12 px-4 rounded-lg border border-gray-300
                bg-white text-sm text-gray-900 outline-none transition-all
                placeholder:text-gray-400
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
    </div>
  )
}

export default Form