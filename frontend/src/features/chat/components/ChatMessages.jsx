import { BotMessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EmptyChat from './EmptyChat.jsx';

const ChatMessages = ({ messages, loading, isEmptyChat, messagesEndRef }) => {
    return (
        <div className="relative flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 bg-[#05070b]">
            {isEmptyChat ? (
                <EmptyChat />
            ) : (
                <div className="relative max-w-5xl mx-auto space-y-1">
                    {messages.map((item) => (
                        <div
                            key={item.id || item._id}
                            className={
                                item.role === 'user'
                                    ? 'flex justify-end'
                                    : 'flex justify-start'
                            }
                        >
                            {item.role === 'user' ? (
                                <div className="max-w-[88%] sm:max-w-[75%] lg:max-w-[70%] px-5 py-4 rounded-2xl border border-indigo-400/30 bg-indigo-500 text-white text-sm leading-6 shadow-lg break-words">
                                    {item.content}
                                </div>
                            ) : (
                                <div className="w-full rounded-3xl border-0 lg:border border-gray-800 bg-black/80 shadow-2xl px-5 py-6 sm:px-8 sm:py-8 overflow-hidden">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            p: ({ children }) => (
                                                <p className="text-gray-300 text-sm leading-7 mb-3 last:mb-0">
                                                    {children}
                                                </p>
                                            ),

                                            strong: ({ children }) => (
                                                <strong className="font-semibold text-white">
                                                    {children}
                                                </strong>
                                            ),

                                            em: ({ children }) => (
                                                <em className="italic text-gray-200">
                                                    {children}
                                                </em>
                                            ),

                                            ul: ({ children }) => (
                                                <ul className="list-disc ml-5 mb-3 space-y-1 text-gray-300 text-sm leading-7">
                                                    {children}
                                                </ul>
                                            ),

                                            ol: ({ children }) => (
                                                <ol className="list-decimal ml-5 mb-3 space-y-1 text-gray-300 text-sm leading-7">
                                                    {children}
                                                </ol>
                                            ),

                                            li: ({ children }) => (
                                                <li className="text-gray-300">
                                                    {children}
                                                </li>
                                            ),

                                            code: ({ children }) => (
                                                <code className="px-1.5 py-0.5 rounded bg-gray-800 text-indigo-300 text-sm break-words">
                                                    {children}
                                                </code>
                                            ),

                                            pre: ({ children }) => (
                                                <pre className="w-full overflow-x-auto rounded-xl bg-gray-900 border border-gray-800 p-4 mb-4 text-sm text-gray-200">
                                                    {children}
                                                </pre>
                                            ),

                                            table: ({ children }) => (
                                                <div className="w-full overflow-x-auto my-5">
                                                    <table className="w-full table-auto border-collapse border border-gray-500 text-white text-sm">
                                                        {children}
                                                    </table>
                                                </div>
                                            ),

                                            thead: ({ children }) => (
                                                <thead className="bg-gray-800 text-white">
                                                    {children}
                                                </thead>
                                            ),

                                            tbody: ({ children }) => (
                                                <tbody className="text-gray-200">
                                                    {children}
                                                </tbody>
                                            ),

                                            tr: ({ children }) => (
                                                <tr className="border-b border-gray-500">
                                                    {children}
                                                </tr>
                                            ),

                                            th: ({ children }) => (
                                                <th className="border border-gray-500 px-4 py-3 text-left font-semibold text-white align-top whitespace-normal break-words">
                                                    {children}
                                                </th>
                                            ),

                                            td: ({ children }) => (
                                                <td className="border border-gray-500 px-4 py-3 text-gray-200 align-top whitespace-normal break-words">
                                                    {children}
                                                </td>
                                            )
                                        }}
                                    >
                                        {item.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="w-full rounded-3xl border-0 lg:border border-gray-800 bg-black/80 shadow-2xl px-5 py-6 sm:px-8 sm:py-8">
                                <div className="flex items-center gap-3 text-gray-400">
                                    <BotMessageSquare
                                        size={19}
                                        className="text-indigo-400"
                                    />

                                    <span className="text-sm">
                                        Qevro-Ai is thinking...
                                    </span>

                                    <span className="flex gap-1 ml-1">
                                        <span className="animate-bounce">
                                            .
                                        </span>

                                        <span className="animate-bounce [animation-delay:150ms]">
                                            .
                                        </span>

                                        <span className="animate-bounce [animation-delay:300ms]">
                                            .
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        ref={messagesEndRef}
                        className="h-px w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default ChatMessages;