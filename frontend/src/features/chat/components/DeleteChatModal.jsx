const DeleteChatModal = ({ deleteChatId, confirmDeleteChat, cancelDeleteChat }) => {
    if (!deleteChatId) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-black shadow-2xl p-6">
                <h2 className="text-xl font-semibold text-white">Delete Chat?</h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                    Are you sure you want to delete this chat? This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={cancelDeleteChat}
                        className="px-5 h-10 rounded-lg border border-white bg-black text-white text-sm font-medium cursor-pointer hover:bg-gray-900 transition-all duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={confirmDeleteChat}
                        className="px-5 h-10 rounded-lg bg-red-500 text-white text-sm font-medium cursor-pointer hover:bg-red-400 transition-all duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChatModal;