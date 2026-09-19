import {
    Send,
    BotMessageSquare
} from 'lucide-react';


const ChatInput = ({
    message,
    setMessage,
    handleSend,
    handleKeyDown,
    loading
}) => {

    return (
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
    );
};


export default ChatInput;