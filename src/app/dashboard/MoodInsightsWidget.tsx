"use client";

import { useEffect, useState } from "react";
import { fetchMoodInsights } from "@/lib/actions";
import { TrendingUp, Lightbulb, Target, Loader2 } from "lucide-react";

type Insights = {
    pattern: string;
    observation: string;
    suggestion: string;
} | null;

export default function MoodInsights() {
    const [insights, setInsights] = useState<Insights>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInsights();
    }, []);

    async function loadInsights() {
        setLoading(true);
        const data = await fetchMoodInsights();
        setInsights(data);
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-center h-48">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            </div>
        );
    }

    if (!insights) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-2">AI Mood Insights</h3>
                <p className="text-gray-500 text-sm">
                    Track your mood for at least a week to unlock AI-powered insights!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-xl shadow-sm border border-primary-100">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-white rounded-lg">
                    <Lightbulb className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">AI Mood Insights</h3>
            </div>

            <div className="space-y-4">
                <InsightCard
                    icon={<TrendingUp size={18} />}
                    title="Pattern Detected"
                    content={insights.pattern}
                    color="text-blue-600"
                />
                <InsightCard
                    icon={<Target size={18} />}
                    title="Key Observation"
                    content={insights.observation}
                    color="text-purple-600"
                />
                <InsightCard
                    icon={<Lightbulb size={18} />}
                    title="Recommendation"
                    content={insights.suggestion}
                    color="text-green-600"
                />
            </div>

            <button
                onClick={loadInsights}
                className="mt-4 w-full py-2 text-sm text-primary hover:bg-white/50 rounded-lg transition"
            >
                Refresh Insights
            </button>
        </div>
    );
}

function InsightCard({ icon, title, content, color }: { icon: React.ReactNode; title: string; content: string; color: string }) {
    return (
        <div className="bg-white/70 p-4 rounded-lg">
            <div className={`flex items-center gap-2 mb-1 ${color} font-semibold text-sm`}>
                {icon}
                <span>{title}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
        </div>
    );
}
