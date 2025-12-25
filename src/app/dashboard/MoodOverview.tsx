"use client";

import { clsx } from "clsx";

type MoodLog = {
    id: number;
    moodScore: number;
    createdAt: Date | null;
    userId: number | null;
    note: string | null;
};

export default function MoodOverview({ moods }: { moods: MoodLog[] }) {
    // Normalize moods for display (last 7 logs or placeholders)
    // Simple visualization: Bar chart where height = score (1-5)

    const displayMoods = moods.slice(0, 7).reverse();

    return (
        <div className="flex flex-col h-full justify-end">
            {moods.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
                    No mood data yet. Start tracking today!
                </div>
            ) : (
                <div className="flex items-end justify-between h-48 gap-4 px-2">
                    {displayMoods.map((mood, idx) => (
                        <div key={idx} className="flex flex-col items-center w-full group">
                            <div className="mb-2 opacity-0 group-hover:opacity-100 transition text-xs bg-gray-800 text-white px-2 py-1 rounded">
                                {mood.note || "No note"}
                            </div>
                            <div
                                className={clsx(
                                    "w-full rounded-t-lg transition hover:brightness-110 relative",
                                    mood.moodScore >= 4 ? "bg-green-400" :
                                        mood.moodScore === 3 ? "bg-yellow-400" :
                                            "bg-red-400"
                                )}
                                style={{ height: `${(mood.moodScore / 5) * 100}%` }}
                            >
                            </div>
                            <div className="mt-2 text-xs text-gray-500 font-medium">
                                {new Date(mood.createdAt!).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 flex justify-between text-xs text-gray-400 px-2 italic">
                <span>Low</span>
                <span>Neutral</span>
                <span>High</span>
            </div>
        </div>
    );
}
