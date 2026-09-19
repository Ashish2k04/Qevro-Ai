import { PanelLeftOpen, PanelRightOpen, Trash2, UserRound, LogOut } from 'lucide-react';

const ChatSidebar = ({
    chats,
    sidebarOpen,
    setSidebarOpen,
    handleNewChat,
    handleSelectChat,
    handleDeleteChat
}) => {
    return (
        <>
            <aside className={`shrink-0 h-full border-r border-gray-800/80 bg-gray-900/60 backdrop-blur-xl transition-all duration-300 ease-in-out lg:relative lg:z-auto ${sidebarOpen ? 'w-[290px] fixed inset-y-0 left-0 z-50 lg:relative lg:w-[290px]' : 'w-0 fixed inset-y-0 left-0 z-40 border-r-0 bg-transparent lg:relative lg:w-0'}`}>
                <div className={`h-full flex flex-col p-4 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-semibold tracking-tight text-white whitespace-nowrap">
                            Qevro<span className="text-indigo-400">Ai.</span>
                        </h1>

                        <button type="button" onClick={() => setSidebarOpen(false)} className="w-10 h-10 shrink-0 rounded-lg border border-gray-700 bg-gray-800/80 text-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200">
                            <PanelRightOpen size={19} />
                        </button>
                    </div>

                    <button type="button" onClick={handleNewChat} className="w-full h-12 mb-4 px-4 rounded-xl border border-gray-700/80 bg-gray-800/50 text-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-800 hover:border-gray-600 hover:text-white transition-all duration-200">
                        + New Chat
                    </button>

                    <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="space-y-3">
                            {Object.values(chats).map((chatItem) => (
                                <div
                                    key={chatItem.id}
                                    onClick={() => handleSelectChat(chatItem.id)}
                                    className="group w-full h-12 px-4 rounded-xl border border-gray-700/80 bg-gray-800/50 flex items-center justify-between cursor-pointer hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
                                >
                                    <span className="text-sm text-gray-300 truncate">
                                        {chatItem.title}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={(e) => handleDeleteChat(e, chatItem.id)}
                                        className="shrink-0 ml-3 text-gray-400/70 hover:text-gray-300 cursor-pointer transition-all duration-200 hover:scale-110"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )).reverse()}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                        <button type="button" className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer hover:bg-red-400 hover:scale-105 transition-all duration-200">
                            <LogOut size={19} />
                        </button>

                        <button type="button" className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center cursor-pointer hover:bg-indigo-100 hover:scale-105 transition-all duration-200">
                            <UserRound size={19} />
                        </button>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />
            )}

            {!sidebarOpen && (
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="hidden lg:flex fixed top-5 left-4 z-50 w-10 h-10 rounded-lg border border-gray-700 bg-gray-800/90 text-gray-300 items-center justify-center cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200"
                >
                    <PanelLeftOpen size={19} />
                </button>
            )}
        </>
    );
};

export default ChatSidebar;