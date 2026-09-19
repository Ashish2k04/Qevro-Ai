import { BotMessageSquare } from 'lucide-react';


const EmptyChat = () => {

    return (
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
    );
};


export default EmptyChat;