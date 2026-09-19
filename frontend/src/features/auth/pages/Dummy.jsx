import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  UserRound,
  PanelLeftOpen,
  PanelRightOpen,
  Trash2,
  Send,
  BotMessageSquare,
  LogOut,
} from 'lucide-react';

import { useChat } from '../../chat/hooks/useChat.js';

import {
  setChats,
  setcurrentChatId,
  setError,
  deleteChatFromStore,
} from '../../chat/chat.slice.js';

import {
  getChats,
  getMessages,
  deletChat,
} from '../../chat/services/chat.api.js';


const Dummy = () => {

  const dispatch = useDispatch();

  const chat = useChat();


  /*
  |--------------------------------------------------------------------------
  | REDUX STATE
  |--------------------------------------------------------------------------
  */

  const chats = useSelector(
    (state) => state.chat.chats
  );

  const currentChatId = useSelector(
    (state) => state.chat.currentChatId
  );

  const loading = useSelector(
    (state) => state.chat.loading
  );


  /*
  |--------------------------------------------------------------------------
  | LOCAL STATE
  |--------------------------------------------------------------------------
  */

  const [sidebarOpen, setSidebarOpen] = useState(() => {

    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }

    return true;
  });


  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);


  /*
  |--------------------------------------------------------------------------
  | SOCKET CONNECTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    chat.initializeSocketConnection();

  }, []);


  /*
  |--------------------------------------------------------------------------
  | GET ALL CHATS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const fetchChats = async () => {

      try {

        const data = await getChats();

        const fetchedChats = data?.chats || [];

        const chatsObject = {};

        fetchedChats.forEach((chatItem) => {

          chatsObject[chatItem._id] = {

            id: chatItem._id,

            title: chatItem.title,

            messages: [],

            lastUpdated:
              chatItem.updatedAt ||
              chatItem.createdAt ||
              new Date().toISOString()

          };

        });


        dispatch(setChats(chatsObject));

      }
      catch (error) {

        if (error.response?.status === 404) {

          dispatch(setChats({}));

          return;

        }


        dispatch(
          setError(
            error.response?.data?.message ||
            "Something went wrong while fetching chats"
          )
        );

      }

    };


    fetchChats();

  }, [dispatch]);


  /*
  |--------------------------------------------------------------------------
  | SELECT CHAT
  |--------------------------------------------------------------------------
  */

  const handleSelectChat = async (chatId) => {

    try {

      dispatch(
        setcurrentChatId(chatId)
      );


      const data = await getMessages(chatId);

      const fetchedMessages =
        data?.messages || [];


      const formattedMessages =
        fetchedMessages.map((item) => ({
          id: item._id,
          content: item.content,
          role: item.role
        }));


      setMessages(formattedMessages);

    }
    catch (error) {

      dispatch(
        setError(
          error.response?.data?.message ||
          "Something went wrong while loading messages"
        )
      );

    }

  };


  /*
  |--------------------------------------------------------------------------
  | NEW CHAT
  |--------------------------------------------------------------------------
  */

  const handleNewChat = () => {

    dispatch(
      setcurrentChatId(null)
    );


    setMessages([]);

  };


  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const handleSend = async (e) => {

    e.preventDefault();


    const trimmedMessage =
      message.trim();


    if (!trimmedMessage) {
      return;
    }


    /*
    |--------------------------------------------------------------------------
    | SAVE CURRENT CHAT ID
    |--------------------------------------------------------------------------
    */

    const chatIdAtStart =
      currentChatId;


    /*
    |--------------------------------------------------------------------------
    | SHOW USER MESSAGE IMMEDIATELY
    |--------------------------------------------------------------------------
    */

    const temporaryUserMessage = {

      id: Date.now(),

      role: 'user',

      content: trimmedMessage

    };


    setMessages((prev) => [

      ...prev,

      temporaryUserMessage

    ]);


    setMessage('');


    try {

      /*
      |--------------------------------------------------------------------------
      | SEND API REQUEST
      |--------------------------------------------------------------------------
      */

      const data =
        await chat.handleSendMessages({

          message: trimmedMessage,

          chatId: chatIdAtStart

        });


      console.log(
        'API RESPONSE:',
        data
      );


      /*
      |--------------------------------------------------------------------------
      | NEW CHAT
      |--------------------------------------------------------------------------
      */

      if (
        !chatIdAtStart &&
        data?.chat
      ) {

        const newChatId =
          data.chat._id;


        dispatch(
          setcurrentChatId(newChatId)
        );


        /*
        |--------------------------------------------------------------------------
        | AI RESPONSE
        |--------------------------------------------------------------------------
        */

        if (data?.aiMessage) {

          setMessages((prev) => [

            ...prev,

            {

              id:
                data.aiMessage._id ||
                Date.now() + 1,

              role:
                data.aiMessage.role ||
                'ai',

              content:
                data.aiMessage.content ||
                ''

            }

          ]);

        }

      }


      /*
      |--------------------------------------------------------------------------
      | EXISTING CHAT
      |--------------------------------------------------------------------------
      */

      else if (chatIdAtStart) {

        if (data?.aiMessage) {

          setMessages((prev) => [

            ...prev,

            {

              id:
                data.aiMessage._id ||
                Date.now() + 1,

              role:
                data.aiMessage.role ||
                'ai',

              content:
                data.aiMessage.content ||
                ''

            }

          ]);

        }

      }

    }
    catch (error) {

      console.error(
        'Error while sending message:',
        error
      );

    }

  };


  /*
  |--------------------------------------------------------------------------
  | DELETE CHAT
  |--------------------------------------------------------------------------
  */

  const handleDeleteChat = async (
    e,
    chatId
  ) => {

    e.stopPropagation();


    try {

      await deletChat(chatId);


      dispatch(
        deleteChatFromStore(chatId)
      );


      if (
        currentChatId === chatId
      ) {

        setMessages([]);

      }

    }
    catch (error) {

      dispatch(
        setError(
          error.response?.data?.message ||
          "Something went wrong while deleting chat"
        )
      );

    }

  };


  /*
  |--------------------------------------------------------------------------
  | ENTER KEY SEND
  |--------------------------------------------------------------------------
  */

  const handleKeyDown = (e) => {

    if (
      e.key === 'Enter' &&
      !e.shiftKey
    ) {

      e.preventDefault();

      handleSend(e);

    }

  };


  /*
  |--------------------------------------------------------------------------
  | EMPTY CHAT CHECK
  |--------------------------------------------------------------------------
  */

  const isEmptyChat =
    !currentChatId &&
    messages.length === 0;


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

              lg:relative
              lg:z-auto

              ${
                sidebarOpen
                  ? `
                    w-[290px]
                    fixed inset-y-0 left-0 z-50
                    lg:relative lg:w-[290px]
                  `
                  : `
                    w-0
                    fixed inset-y-0 left-0 z-40
                    border-r-0
                    bg-transparent
                    lg:relative lg:w-0
                  `
              }
            `}
          >

            <div
              className={`
                h-full flex flex-col p-4

                ${
                  sidebarOpen
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }
              `}
            >


              {/* Sidebar Header */}

              <div className="flex items-center justify-between mb-8">

                {/* Logo */}

                <h1
                  className="
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-white
                    whitespace-nowrap
                  "
                >
                  Qevro<span className="text-indigo-400">Ai.</span>
                </h1>


                {/* Collapse */}

                <button
                  type="button"
                  onClick={() =>
                    setSidebarOpen(false)
                  }
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
                  <PanelRightOpen size={19} />
                </button>

              </div>


              {/* NEW CHAT */}

              <button
                type="button"
                onClick={handleNewChat}
                className="
                  w-full
                  h-12
                  mb-4
                  px-4
                  rounded-xl
                  border border-gray-700/80
                  bg-gray-800/50
                  text-gray-300
                  flex items-center justify-center
                  cursor-pointer
                  hover:bg-gray-800
                  hover:border-gray-600
                  hover:text-white
                  transition-all duration-200
                "
              >
                + New Chat
              </button>


              {/* Chat Titles */}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >

                <div className="space-y-3">

                  {Object.values(chats).map(
                    (chatItem) => (

                      <div
                        key={chatItem.id}
                        onClick={() =>
                          handleSelectChat(
                            chatItem.id
                          )
                        }
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

                        <span
                          className="
                            text-sm
                            text-gray-300
                            truncate
                          "
                        >
                          {chatItem.title}
                        </span>


                        {/* Delete */}

                        <button
                          type="button"
                          onClick={(e) =>
                            handleDeleteChat(
                              e,
                              chatItem.id
                            )
                          }
                          className="
                            shrink-0
                            ml-3
                            text-gray-400/70
                            hover:text-gray-300
                            cursor-pointer
                            transition-all duration-200
                            hover:scale-110
                          "
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* Sidebar Bottom */}

              <div
                className="
                  pt-4
                  border-t border-gray-800
                  flex items-center justify-between
                "
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


          {/* MOBILE SIDEBAR OVERLAY */}

          {sidebarOpen && (
            <div
              onClick={() =>
                setSidebarOpen(false)
              }
              className="
                fixed
                inset-0
                z-40
                bg-black/40
                lg:hidden
              "
            />
          )}


          {/* DESKTOP SIDEBAR OPEN BUTTON */}

          {!sidebarOpen && (
            <button
              type="button"
              onClick={() =>
                setSidebarOpen(true)
              }
              className="
                hidden
                lg:flex
                fixed
                top-5
                left-4
                z-50
                w-10 h-10
                rounded-lg
                border border-gray-700
                bg-gray-800/90
                text-gray-300
                items-center justify-center
                cursor-pointer
                hover:bg-gray-700
                hover:text-white
                transition-all duration-200
              "
            >
              <PanelLeftOpen size={19} />
            </button>
          )}


          {/* CHAT AREA */}

          <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-black/30">


            {/* MOBILE TOP BAR */}

            <div
              className="
                lg:hidden
                relative
                h-16
                shrink-0
                flex items-center
                px-4
                bg-[#05070b]
                border-b border-gray-800/60
              "
            >

              {!sidebarOpen && (
                <button
                  type="button"
                  onClick={() =>
                    setSidebarOpen(true)
                  }
                  className="
                    relative
                    z-50
                    w-10 h-10
                    rounded-lg
                    border border-gray-700
                    bg-[#05070b]
                    text-gray-300
                    flex items-center justify-center
                    cursor-pointer
                    hover:bg-gray-900
                    hover:text-white
                    transition-all duration-200
                  "
                >
                  <PanelLeftOpen size={19} />
                </button>
              )}

            </div>


            {/* MESSAGES AREA */}

            <div
              className="
                relative
                flex-1
                min-h-0
                overflow-y-auto
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                px-4
                py-6
                sm:px-6
                sm:py-8
                lg:px-8
                bg-[#05070b]
              "
            >

              {/* EMPTY NEW CHAT */}

              {isEmptyChat ? (

                <div
                  className="
                    h-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <BotMessageSquare
                    size={42}
                    strokeWidth={1.8}
                    className="
                      text-indigo-400
                      mb-5
                    "
                  />

                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      font-semibold
                      text-gray-200
                      tracking-tight
                    "
                  >
                    Welcome to Qevro-Ai
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-gray-500
                    "
                  >
                    Ask anything and start a new conversation.
                  </p>

                </div>

              ) : (

                <div
                  className="
                    relative
                    max-w-5xl
                    mx-auto
                    space-y-1
                  "
                >

                  {/* MESSAGES */}

                  {messages.map((item) => (

                    <div
                      key={item.id}
                      className={
                        item.role === 'user'
                          ? 'flex justify-end'
                          : 'flex justify-start'
                      }
                    >

                      {item.role === 'user' ? (

                        /* USER MESSAGE */

                        <div
                          className="
                            max-w-[88%]
                            sm:max-w-[75%]
                            lg:max-w-[70%]
                            px-5 py-4
                            rounded-2xl
                            border border-indigo-400/30
                            bg-indigo-500
                            text-white
                            text-sm
                            leading-6
                            shadow-lg
                            break-words
                          "
                        >
                          {item.content}
                        </div>

                      ) : (

                        /* AI RESPONSE */

                        <div
                          className="
                            w-full
                            rounded-3xl
                            border-0
                            lg:border
                            border-gray-800
                            bg-black/80
                            shadow-2xl
                            px-5 py-6
                            sm:px-8
                            sm:py-8
                          "
                        >

                          <p
                            className="
                              text-gray-300
                              text-sm
                              leading-7
                            "
                          >
                            {item.content}
                          </p>

                        </div>

                      )}

                    </div>

                  ))}


                  {/* AI THINKING PLACEHOLDER */}

                  {loading && (

                    <div
                      className="
                        flex
                        justify-start
                      "
                    >

                      <div
                        className="
                          w-full
                          rounded-3xl
                          border-0
                          lg:border
                          border-gray-800
                          bg-black/80
                          shadow-2xl
                          px-5 py-6
                          sm:px-8
                          sm:py-8
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            text-gray-400
                          "
                        >

                          <BotMessageSquare
                            size={19}
                            className="text-indigo-400"
                          />

                          <span className="text-sm">
                            Qevro-Ai is thinking...
                          </span>

                          <span
                            className="
                              flex
                              gap-1
                              ml-1
                            "
                          >

                            <span className="animate-bounce">
                              .
                            </span>

                            <span
                              className="
                                animate-bounce
                                [animation-delay:150ms]
                              "
                            >
                              .
                            </span>

                            <span
                              className="
                                animate-bounce
                                [animation-delay:300ms]
                              "
                            >
                              .
                            </span>

                          </span>

                        </div>

                      </div>

                    </div>

                  )}

                </div>

              )}

            </div>


            {/* INPUT */}

            <div
              className="
                shrink-0
                px-4
                pb-4
                pt-3
                sm:px-6
                sm:pb-5
                lg:px-8
                lg:pb-7
                lg:pt-4
                bg-black/40
                border-t border-gray-800/60
              "
            >

              <form
                onSubmit={handleSend}
                className="max-w-4xl mx-auto"
              >

                <div
                  className="
                    relative
                    min-h-[64px]
                    rounded-2xl
                    border border-gray-700
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
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything"
                    rows={1}
                    className="
                      w-full
                      min-h-[64px]
                      resize-none
                      overflow-hidden
                      bg-transparent
                      outline-none
                      border-none
                      text-sm
                      text-gray-200
                      placeholder:text-gray-300
                      px-5
                      py-5
                      pr-16
                    "
                  />


                  {/* SEND / BOT BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
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

                    {message.trim() ? (

                      <Send size={18} />

                    ) : (

                      <BotMessageSquare
                        size={20}
                        strokeWidth={2}
                      />

                    )}

                  </button>

                </div>

              </form>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};


export default Dummy;