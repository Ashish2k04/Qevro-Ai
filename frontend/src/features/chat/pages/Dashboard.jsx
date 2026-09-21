import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useChat } from '../hooks/useChat.js';
import { setChats, setcurrentChatId, setError, deleteChatFromStore } from '../chat.slice.js';
import { getChats, getMessages, deletChat } from '../services/chat.api.js';
import { getMe } from '../../auth/services/auth.api.js';
import { setUser } from '../../auth/auth.slice.js';
import ChatSidebar from '../components/ChatSidebar.jsx';
import ChatMessages from '../components/ChatMessages.jsx';
import ChatInput from '../components/ChatInput.jsx';
import DeleteChatModal from '../components/DeleteChatModal.jsx';
import { PanelLeftOpen } from 'lucide-react';

const Dashboard = () => {
    const dispatch = useDispatch();
    const chat = useChat();

    // REDUX STATE
    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId);
    const loading = useSelector((state) => state.chat.loading);
    const user = useSelector((state) => state.auth.user);

    // LOCAL STATE
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024;
        }

        return true;
    });

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [deleteChatId, setDeleteChatId] = useState(null);

    // AUTO SCROLL
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }, [messages, loading]);

    // SOCKET CONNECTION
    useEffect(() => {
        chat.initializeSocketConnection();
    }, []);

    // GET CURRENT USER
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();

                if (data?.userGet) {
                    dispatch(setUser(data.userGet));
                }
            }
            catch (error) {
                console.error('Error while fetching user:', error);
            }
        };

        fetchUser();
    }, [dispatch]);

    // GET ALL CHATS
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

    // SELECT CHAT
    const handleSelectChat = async (chatId) => {
        try {
            dispatch(setcurrentChatId(chatId));

            const data = await getMessages(chatId);
            const fetchedMessages = data?.messages || [];

            const formattedMessages = fetchedMessages.map((item) => ({
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

    // NEW CHAT
    const handleNewChat = () => {
        dispatch(setcurrentChatId(null));
        setMessages([]);
    };

    // SEND MESSAGE
    const handleSend = async (e) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return;
        }

        // SAVE CURRENT CHAT ID
        const chatIdAtStart = currentChatId;

        // SHOW USER MESSAGE IMMEDIATELY
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
            // SEND API REQUEST
            const data = await chat.handleSendMessages({
                message: trimmedMessage,
                chatId: chatIdAtStart
            });

            // NEW CHAT
            if (!chatIdAtStart && data?.chat) {
                const newChatId = data.chat._id;

                dispatch(setcurrentChatId(newChatId));

                // AI RESPONSE
                if (data?.aiMessage) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: data.aiMessage._id || Date.now() + 1,
                            role: data.aiMessage.role || 'ai',
                            content: data.aiMessage.content || ''
                        }
                    ]);
                }
            }

            // EXISTING CHAT
            else if (chatIdAtStart) {
                if (data?.aiMessage) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: data.aiMessage._id || Date.now() + 1,
                            role: data.aiMessage.role || 'ai',
                            content: data.aiMessage.content || ''
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

    // OPEN DELETE CONFIRMATION
    const handleDeleteChat = (e, chatId) => {
        e.stopPropagation();
        setDeleteChatId(chatId);
    };

    // CONFIRM DELETE CHAT
    const confirmDeleteChat = async () => {
        if (!deleteChatId) {
            return;
        }

        try {
            await deletChat(deleteChatId);

            dispatch(deleteChatFromStore(deleteChatId));

            if (currentChatId === deleteChatId) {
                setMessages([]);
                dispatch(setcurrentChatId(null));
            }

            setDeleteChatId(null);
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

    // CANCEL DELETE
    const cancelDeleteChat = () => {
        setDeleteChatId(null);
    };

    // ENTER KEY SEND
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
        }
    };

    // EMPTY CHAT CHECK
    const isEmptyChat =
        !currentChatId &&
        messages.length === 0;

    return (
        <div className="h-screen w-full bg-[#090d17] overflow-hidden">
            <div className="relative h-full w-full overflow-hidden bg-gray-950">
                <div className="absolute -top-52 -left-52 w-[650px] h-[650px] rounded-full bg-indigo-700/20 blur-[130px] pointer-events-none" />

                <div className="absolute -bottom-52 left-[30%] w-[650px] h-[650px] rounded-full bg-purple-700/20 blur-[130px] pointer-events-none" />

                <div className="absolute -top-52 -right-52 w-[650px] h-[650px] rounded-full bg-indigo-700/15 blur-[130px] pointer-events-none" />

                <div className="relative flex h-full">
                    <ChatSidebar
                        chats={chats}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleNewChat={handleNewChat}
                        handleSelectChat={handleSelectChat}
                        handleDeleteChat={handleDeleteChat}
                        username={user?.username}
                    />

                    <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-black/30">
                        <div className="lg:hidden relative h-16 shrink-0 flex items-center px-4 bg-[#05070b] border-b border-gray-800/60">
                            {!sidebarOpen && (
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(true)}
                                    className="relative z-50 w-10 h-10 rounded-lg border border-gray-700 bg-[#05070b] text-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-900 hover:text-white transition-all duration-200"
                                >
                                    <PanelLeftOpen size={19} />
                                </button>
                            )}
                        </div>

                        <ChatMessages
                            messages={messages}
                            loading={loading}
                            isEmptyChat={isEmptyChat}
                            messagesEndRef={messagesEndRef}
                        />

                        <ChatInput
                            message={message}
                            setMessage={setMessage}
                            handleSend={handleSend}
                            handleKeyDown={handleKeyDown}
                            loading={loading}
                        />
                    </main>
                </div>

                <DeleteChatModal
                    deleteChatId={deleteChatId}
                    confirmDeleteChat={confirmDeleteChat}
                    cancelDeleteChat={cancelDeleteChat}
                />
            </div>
        </div>
    );
};

export default Dashboard;