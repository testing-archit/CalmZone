"use client";

import { seedData } from "@/lib/seed";
import { useState } from "react";
import { Database, Loader2, Check } from "lucide-react";

export default function SettingsPage() {
    const [isSeeding, setIsSeeding] = useState(false);
    const [seeded, setSeeded] = useState(false);

    async function handleSeed() {
        if (!confirm("This will add mock data to your database. Continue?")) return;

        setIsSeeding(true);
        await seedData();
        setIsSeeding(false);
        setSeeded(true);
        setTimeout(() => setSeeded(false), 3000);
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <header className="mb-12 border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">Manage your account and preferences.</p>
            </header>

            <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Database size={24} className="text-secondary" />
                    Developer Tools
                </h2>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                        <h3 className="font-bold text-gray-700">Populate Demo Data</h3>
                        <p className="text-sm text-gray-500">Adds realistic user history (moods, journals, tasks) for testing.</p>
                    </div>
                    <button
                        onClick={handleSeed}
                        disabled={isSeeding}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition shadow-sm flex items-center gap-2"
                    >
                        {isSeeding ? <Loader2 size={16} className="animate-spin" /> : seeded ? <Check size={16} className="text-green-500" /> : null}
                        {isSeeding ? "Seeding..." : seeded ? "Done!" : "Run Script"}
                    </button>
                </div>
            </section>
        </div>
    );
}
