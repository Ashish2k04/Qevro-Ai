import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import {
  UserRound,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Send,
  LogOut,
} from 'lucide-react';
import { useChat } from '../hooks/useChat';

const Dashboard = () => {

    const { user } = useSelector(state => state.auth);
    const { initializeSocketConnection } = useChat();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [message, setMessage] = useState('');

    const [chats, setChats] = useState([
      'Building a REST API',
      'Explain Redis caching',
      'React authentication',
      'System design basics',
      'MongoDB aggregation',
    ]);

    console.log(user)

    useEffect(() => {
      initializeSocketConnection();
    }, [])

    const deleteChat = (index) => {
      setChats(chats.filter((_, i) => i !== index));
    }

    const handleSend = (e) => {
      e.preventDefault();

      if (!message.trim()) return;

      setMessage('');
    }

  return (
    <div className="h-screen w-full bg-[#090d17] overflow-hidden select-none">

      {/* Main Qevro Container */}
      <div className="relative h-full w-full overflow-hidden bg-gray-950">

        {/* Background Aura */}
        <div
          className="
            absolute -top-52 -left-52
            w-[650px] h-[650px]
            rounded-full
            bg-indigo-700/20
            blur-[130px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute -bottom-52 left-[30%]
            w-[650px] h-[650px]
            rounded-full
            bg-purple-700/20
            blur-[130px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute -top-52 -right-52
            w-[650px] h-[650px]
            rounded-full
            bg-indigo-700/15
            blur-[130px]
            pointer-events-none
          "
        />

        {/* Main Layout */}
        <div className="relative flex h-full">

          {/* SIDEBAR */}
          <aside
            className={`
              shrink-0 h-full
              border-r border-gray-800/80
              bg-gray-900/60
              backdrop-blur-xl
              transition-all duration-300 ease-in-out
              ${sidebarOpen ? 'w-[290px]' : 'w-[72px]'}
            `}
          >

            <div className="h-full flex flex-col p-4">

              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-8">

                {/* Logo */}
                <h1
                  className={`
                    text-2xl font-semibold tracking-tight
                    text-white transition-all duration-300
                    whitespace-nowrap
                    ${sidebarOpen
                      ? 'opacity-100'
                      : 'opacity-0 w-0 overflow-hidden'
                    }
                  `}
                >
                  Qevro<span className="text-indigo-400">Ai.</span>
                </h1>

                {/* Collapse */}
                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="
                    w-10 h-10 shrink-0
                    rounded-lg
                    border border-gray-700
                    bg-gray-800/80
                    text-gray-300
                    flex items-center justify-center
                    cursor-pointer
                    hover:bg-gray-700
                    hover:text-white
                    transition-all duration-200
                  "
                >
                  {sidebarOpen ? (
                    <ChevronLeft size={19} />
                  ) : (
                    <ChevronRight size={19} />
                  )}
                </button>

              </div>


              {/* Chat Titles */}
              <div
                className={`
                  flex-1 overflow-y-auto
                  transition-all duration-300
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                  ${sidebarOpen
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                  }
                `}
              >

                <div className="space-y-3">

                  {chats.map((chat, index) => (

                    <div
                      key={index}
                      className="
                        group
                        w-full
                        h-12
                        px-4
                        rounded-xl
                        border border-gray-700/80
                        bg-gray-800/50
                        flex items-center justify-between
                        cursor-pointer
                        hover:bg-gray-800
                        hover:border-gray-600
                        transition-all duration-200
                      "
                    >

                      <span className="
                        text-sm
                        text-gray-300
                        truncate
                      ">
                        {chat}
                      </span>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => deleteChat(index)}
                        className="
                          shrink-0
                          ml-3
                          text-red-500/70
                          hover:text-red-400
                          cursor-pointer
                          transition-all duration-200
                          hover:scale-110
                        "
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  ))}

                </div>

              </div>


              {/* Sidebar Bottom */}
              <div
                className={`
                  pt-4
                  border-t border-gray-800
                  flex items-center justify-between
                  transition-all duration-300
                  ${sidebarOpen
                    ? 'opacity-100'
                    : 'opacity-0'
                  }
                `}
              >

                {/* Logout */}
                <button
                  type="button"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-red-500
                    text-white
                    flex items-center justify-center
                    cursor-pointer
                    hover:bg-red-400
                    hover:scale-105
                    transition-all duration-200
                  "
                >
                  <LogOut size={19} />
                </button>


                {/* User Icon */}
                <button
                  type="button"
                  className="
                    w-10 h-10
                    rounded-full
                    bg-white
                    text-gray-900
                    flex items-center justify-center
                    cursor-pointer
                    hover:bg-indigo-100
                    hover:scale-105
                    transition-all duration-200
                  "
                >
                  <UserRound size={19} />
                </button>

              </div>

            </div>

          </aside>


          {/* CHAT AREA */}
          <main className="flex-1 min-w-0 flex flex-col bg-black/30">

            {/* Chat Header */}
            <div
              className="
                h-16
                shrink-0
                px-8
                flex items-center
                border-b border-gray-800/80
                bg-gray-900/40
                backdrop-blur-xl
              "
            >

              <h2 className="text-sm font-medium text-gray-300">
                New Chat
              </h2>

            </div>


            {/* Messages Area */}
            <div className="relative flex-1 overflow-y-auto px-8 py-8 bg-[#05070b]">

              <div className="relative max-w-5xl mx-auto space-y-3">

                {/* User Message */}
                <div className="flex justify-end">

                  <div
                    className="
                      max-w-[70%]
                      px-6 py-4
                      rounded-2xl
                      border border-indigo-400/30
                      bg-indigo-500
                      text-white
                      text-sm
                      leading-6
                      shadow-lg
                    "
                  >
                    Can you explain how Redis caching works
                    and when I should use it in my backend?
                  </div>

                </div>


                {/* AI Response */}
                <div className="flex justify-start">

                  <div
                    className="
                      w-full
                      min-h-[300px]
                      rounded-3xl
                      border border-gray-800
                      bg-black/80
                      shadow-2xl
                      px-8 py-8
                    "
                  >

                    <p className="
                      text-gray-300
                      text-sm
                      leading-7
                    ">
                      Redis is an in-memory data store that is commonly
                      used as a cache between your application and database.
                      Instead of querying the database every time, your
                      server can temporarily store frequently requested data
                      in Redis.
                    </p>

                    <p className="
                      mt-4
                      text-gray-400
                      text-sm
                      leading-7
                    ">
                      This is useful when the same data is requested often
                      because reading from memory is usually much faster
                      than making another database query.
                    </p>

                  </div>

                </div>


                {/* Second User Message */}
                <div className="flex justify-end">

                  <div
                    className="
                      max-w-[70%]
                      px-6 py-4
                      rounded-2xl
                      border border-indigo-400/30
                      bg-indigo-500
                      text-white
                      text-sm
                      leading-6
                      shadow-lg
                    "
                  >
                    So basically Redis reduces the number of
                    database queries?
                  </div>

                </div>

              </div>

            </div>


            {/* INPUT */}
            <div
              className="
                shrink-0
                px-8
                pb-7
                pt-4
                bg-black/40
                border-t border-gray-800/60
              "
            >

              <form
                onSubmit={handleSend}
                className="max-w-5xl mx-auto"
              >

                <div
                  className="
                    relative
                    min-h-[64px]
                    rounded-2xl
                    border border-gray-600
                    bg-gray-900
                    shadow-lg
                    focus-within:border-indigo-500
                    focus-within:ring-1
                    focus-within:ring-indigo-500/30
                    transition-all duration-200
                  "
                >

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask Qevro-AI anything..."
                    rows={1}
                    className="
                      w-full
                      min-h-[64px]
                      resize-none
                      overflow-hidden
                      bg-transparent
                      outline-none
                      text-sm
                      text-gray-200
                      placeholder:text-gray-500
                      px-5
                      py-5
                      pr-16
                    "
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      w-10 h-10
                      rounded-full
                      bg-indigo-500
                      text-white
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-200
                      hover:bg-indigo-400
                      hover:scale-110
                      active:scale-95
                    "
                  >
                    <Send size={18} />
                  </button>

                </div>

              </form>

            </div>

          </main>

        </div>

      </div>

    </div>
  )
}

export default Dashboard