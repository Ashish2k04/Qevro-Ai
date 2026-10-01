const LogoutModal = ({
    logoutModalOpen,
    confirmLogout,
    cancelLogout
}) => {
    if (!logoutModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-black shadow-2xl p-6">
                <h2 className="text-xl font-semibold text-white">
                    Logout your account?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                    Are you sure you want to logout?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={cancelLogout}
                        className="px-5 h-10 rounded-lg border border-white bg-black text-white text-sm font-medium cursor-pointer hover:bg-gray-900 transition-all duration-200"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={confirmLogout}
                        className="px-5 h-10 rounded-lg bg-red-500 text-white text-sm font-medium cursor-pointer hover:bg-red-400 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;