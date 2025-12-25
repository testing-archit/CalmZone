"use client";

import { useState, useEffect, useRef } from "react";
import { sendChatMessage, getChatHistory } from "@/lib/actions";
import { Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
    id: number;
    role: string;
    content: string;
    createdAt: Date | null;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function loadHistory() {
        const history = await getChatHistory();
        setMessages(history);
    }

    async function handleSend() {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setIsLoading(true);

        // Optimistically add user message
        const tempUserMsg: Message = {
            id: Date.now(),
            role: "user",
            content: userMessage,
            createdAt: new Date(),
        };
        setMessages(prev => [...prev, tempUserMsg]);

        try {
            const response = await sendChatMessage(userMessage);

            // Add AI response
            const aiMsg: Message = {
                id: Date.now() + 1,
                role: "assistant",
                content: response,
                createdAt: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-6 py-8 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">CalmBot Companion</h1>
                <p className="text-gray-600">Your 24/7 mental wellness support buddy</p>
            </header>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-[600px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-20">
                            <Bot size={48} className="mx-auto mb-4 text-primary" />
                            <p>Start a conversation with CalmBot!</p>
                            <p className="text-sm mt-2">I'm here to listen and support you.</p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {msg.role === "assistant" && (
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <Bot size={18} className="text-primary" />
                                </div>
                            )}

                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.role === "user"
                                        ? "bg-primary text-white"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.content}</p>
                            </div>

                            {msg.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
                                    <User size={18} className="text-secondary" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                <Bot size={18} className="text-primary" />
                            </div>
                            <div className="bg-gray-100 rounded-2xl px-4 py-3">
                                <Loader2 size={18} className="animate-spin text-gray-600" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
