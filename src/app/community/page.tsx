import { Users, MessageCircle, Calendar } from "lucide-react";

export default function CommunityPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <header className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Community Support</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connect with others, share experiences, and find support in our moderated spaces.
                </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ForumCard
                    title="Anxiety Support"
                    count="124 topics"
                    description="A safe space to discuss anxiety, share coping strategies, and support each other."
                />
                <ForumCard
                    title="Depression Support"
                    count="98 topics"
                    description="Connect with others who understand depression and share your journey."
                />
                <ForumCard
                    title="Stress Management"
                    count="156 topics"
                    description="Share and learn stress management techniques and daily coping strategies."
                />
                <ForumCard
                    title="Mindfulness & Meditation"
                    count="87 topics"
                    description="Discuss mindfulness practices and meditation experiences."
                />
                <ForumCard
                    title="Self-Care Corner"
                    count="143 topics"
                    description="Share self-care tips, routines, and experiences with the community."
                />
                <ForumCard
                    title="Recovery Stories"
                    count="92 topics"
                    description="Share your recovery journey and inspire others with your story."
                />
            </div>

            <div className="mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Upcoming Events</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <EventCard
                        title="Group Meditation"
                        date="Every Tuesday, 7 PM"
                        type="Online"
                    />
                    <EventCard
                        title="Stress Workshop"
                        date="Next Saturday, 2 PM"
                        type="Online"
                    />
                    <EventCard
                        title="Support Circle"
                        date="Every Thursday, 6 PM"
                        type="Online"
                    />
                </div>
            </div>
        </div>
    );
}

function ForumCard({ title, count, description }: { title: string, count: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary/50 transition cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition">
                    <MessageCircle size={24} />
                </div>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{count}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    )
}

function EventCard({ title, date, type }: { title: string, date: string, type: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="p-3 bg-secondary-50 text-secondary rounded-lg mr-4">
                <Calendar size={24} />
            </div>
            <div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{date} • {type}</p>
            </div>
            <button className="ml-auto text-sm w-fit font-bold text-primary hover:bg-primary-50 px-3 py-1 rounded transition">
                Join
            </button>
        </div>
    )
}
