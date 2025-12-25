"use client";

import { useState } from "react";
import { analyzeEntry } from "@/lib/actions";
import { Sparkles, Loader2 } from "lucide-react";
import { clsx } from "clsx";

type JournalEntry = {
    id: number;
    title: string;
    content: string;
    createdAt: Date | null;
    userId: number | null;
    sentiment: string | null;
    aiResponse: string | null;
};

export default function JournalEntryCard({ entry }: { entry: JournalEntry }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    async function handleAnalyze() {
        setIsAnalyzing(true);
        await analyzeEntry(entry.id, entry.content);
        setIsAnalyzing(false);
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800">{entry.title}</h3>
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                    {new Date(entry.createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-4">{entry.content}</p>

            {entry.aiResponse ? (
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-lg border border-primary-100">
                    <div className="flex items-center gap-2 mb-2 text-sm font-bold text-primary-800">
                        <Sparkles size={16} className="text-primary" />
                        AI Insight ({entry.sentiment})
                    </div>
                    <p className="text-sm text-gray-700 italic">"{entry.aiResponse}"</p>
                </div>
            ) : (
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="text-sm flex items-center gap-2 text-primary hover:text-primary-700 font-medium transition"
                >
                    {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    Analyze with AI
                </button>
            )}
        </div>
    );
}
