import Link from "next/link";
import { BookOpen, Video, Phone, Shield } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <header className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Mental Health Resources</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Curated tools, guides, and support numbers to help you navigate your journey.
                </p>
            </header>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-12 flex items-start">
                <Shield className="text-red-500 w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="text-red-800 font-bold text-lg mb-1">In Crisis?</h3>
                    <p className="text-red-700">If you need immediate support, please call <strong>9152987821</strong> (IN) or your local emergency number.</p>
                </div>
            </div>

            <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Self-Help Tools</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <ResourceCard
                        icon={<Video className="w-8 h-8 text-secondary" />}
                        title="Meditation Guides"
                        description="Access our collection of guided meditation sessions designed for different needs and experience levels."
                        linkText="Start Meditating"
                    />
                    <ResourceCard
                        icon={<BookOpen className="w-8 h-8 text-secondary" />}
                        title="Breathing Exercises"
                        description="Learn various breathing techniques to help manage stress, anxiety, and promote relaxation."
                        linkText="Practice Now"
                    />
                    <ResourceCard
                        icon={<Shield className="w-8 h-8 text-secondary" />}
                        title="Stress Management"
                        description="Discover effective strategies and techniques for managing daily stress and building resilience."
                        linkText="Learn More"
                    />
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Crisis Support</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <ResourceCard
                        icon={<Phone className="w-8 h-8 text-primary" />}
                        title="24/7 Crisis Hotlines"
                        description="List of emergency contact numbers and crisis support services available 24/7."
                        linkText="View Numbers"
                    />
                    <ResourceCard
                        icon={<Shield className="w-8 h-8 text-primary" />}
                        title="Safety Planning"
                        description="Create a personalized safety plan for managing crisis situations effectively."
                        linkText="Create Plan"
                    />
                    <ResourceCard
                        icon={<BookOpen className="w-8 h-8 text-primary" />}
                        title="Local Support Services"
                        description="Find mental health services, therapists, and support groups in your local area."
                        linkText="Find Help"
                    />
                </div>
            </section>
        </div>
    );
}

function ResourceCard({ icon, title, description, linkText }: { icon: React.ReactNode, title: string, description: string, linkText: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition hover:-translate-y-1">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <Link href="#" className="text-primary font-semibold hover:underline flex items-center">
                {linkText} &rarr;
            </Link>
        </div>
    )
}
