"use client";

import { useState } from "react";
import { addMood } from "@/lib/actions";
import { Smile, Frown, Meh, Loader2 } from "lucide-react";
import { clsx } from "clsx";

export default function MoodPage() {
    const [selectedScore, setSelectedScore] = useState<number | null>(null);
    const [isPending, setIsPending] = useState(false);

    const moods = [
        { score: 1, icon: Frown, label: "Awful", color: "text-red-500" },
        { score: 2, icon: Frown, label: "Bad", color: "text-orange-500" },
        { score: 3, icon: Meh, label: "Okay", color: "text-yellow-500" },
        { score: 4, icon: Smile, label: "Good", color: "text-green-500" },
        { score: 5, icon: Smile, label: "Great", color: "text-teal-500" },
    ];

    async function handleSave() {
        if (!selectedScore) return;
        setIsPending(true);
        // Note: In a real app we'd get the note from a textarea
        const note = "Logged via Tracker";
        await addMood(selectedScore, note);
        setIsPending(false);
        setSelectedScore(null);
        alert("Mood logged successfully!");
    }

    return (
        <div className="container mx-auto px-6 py-12 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">How are you feeling today?</h1>

            <div className="flex gap-4 mb-12 flex-wrap justify-center">
                {moods.map((m) => (
                    <button
                        key={m.score}
                        onClick={() => setSelectedScore(m.score)}
                        className={clsx(
                            "flex flex-col items-center p-6 rounded-2xl transition duration-300 border-2",
                            selectedScore === m.score
                                ? "border-primary bg-primary-50 transform scale-110 shadow-lg"
                                : "border-gray-100 bg-white hover:border-primary/50 hover:-translate-y-1"
                        )}
                    >
                        <m.icon size={48} className={clsx("mb-3 transition", m.color, selectedScore === m.score && "scale-110")} />
                        <span className="font-medium text-gray-700">{m.label}</span>
                    </button>
                ))}
            </div>

            <div className="w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">Add a note (Optional)</label>
                <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                    placeholder="Why do you feel this way?"
                ></textarea>
            </div>

            <button
                onClick={handleSave}
                disabled={!selectedScore || isPending}
                className={clsx(
                    "mt-8 px-12 py-3 rounded-full font-bold text-white transition shadow-lg",
                    !selectedScore || isPending
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-primary hover:bg-primary-600 hover:shadow-xl"
                )}
            >
                {isPending ? <Loader2 className="animate-spin" /> : "Log Mood"}
            </button>
        </div>
    );
}
