import { getJournalEntries, addJournalEntry } from "@/lib/actions";
import { BookOpen, PenTool } from "lucide-react";
import JournalEntryCard from "./JournalEntryCard";

export default async function JournalPage() {
    const entries = await getJournalEntries();

    return (
        <div className="container mx-auto px-6 py-8">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Journal</h1>
                <p className="text-gray-600">Reflect on your thoughts and feelings.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                {/* New Entry Form */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <PenTool size={20} className="text-primary" />
                            New Entry
                        </h2>
                        <form action={addJournalEntry} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Today's Reflection"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    name="content"
                                    rows={8}
                                    placeholder="Write your thoughts here..."
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition shadow-sm"
                            >
                                Save Entry
                            </button>
                        </form>
                    </div>
                </div>

                {/* Entries List */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-secondary" />
                        Past Entries
                    </h2>

                    {entries.length === 0 ? (
                        <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
                            You haven't written any entries yet.
                        </div>
                    ) : (
                        entries.map((entry) => (
                            <JournalEntryCard key={entry.id} entry={entry} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
