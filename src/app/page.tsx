"use client";
import Link from "next/link";
import { ArrowRight, Brain, ChartLine, HandHelping } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="absolute inset-0 z-0 opacity-30">
                    {/* Abstract background blobs could go here */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-20 right-20 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6 animate-fade-in-up">
                        Find Your Inner Peace
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Join thousands who have discovered the path to mental wellness with CalmZone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                        <Link href="/dashboard" className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-600 transition shadow-lg hover:shadow-xl flex items-center justify-center">
                            Get Started <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="#features" className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition shadow-md hover:shadow-lg">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Features</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon={<Brain className="w-10 h-10 text-primary" />}
                            title="Personalized Therapy"
                            description="Get matched with licensed therapists who understand your unique needs and goals."
                        />
                        <FeatureCard
                            icon={<ChartLine className="w-10 h-10 text-primary" />}
                            title="Progress Tracking"
                            description="Monitor your mental health journey with our advanced tracking tools."
                        />
                        <FeatureCard
                            icon={<HandHelping className="w-10 h-10 text-primary" />}
                            title="24/7 Support"
                            description="Access immediate help and resources whenever you need them throughout your day."
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard
                            name="Sarah M."
                            quote="CalmZone has transformed my approach to mental health. The personalized support is incredible."
                            initials="SM"
                        />
                        <TestimonialCard
                            name="James R."
                            quote="The progress tracking feature helps me stay motivated and see my improvement over time."
                            initials="JR"
                        />
                        <TestimonialCard
                            name="Emily K."
                            quote="Having 24/7 support gives me peace of mind knowing help is always available."
                            initials="EK"
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Choose Your Plan</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <PricingCard
                            title="Basic"
                            price="$9.99"
                            features={["Basic Mental Health Resources", "Community Support", "Progress Tracking"]}
                        />
                        <PricingCard
                            title="Premium"
                            price="$29.99"
                            features={["All Basic Features", "1-on-1 Therapy Sessions", "24/7 Priority Support", "Advanced Analytics"]}
                            isPremium
                        />
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-2xl">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Get in Touch</h2>
                    <form className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Your Email" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-600 transition shadow-md">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">CalmZone</h3>
                        <p className="text-gray-400">Dedicated to making mental wellness accessible to everyone.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#" className="hover:text-white transition">Home</Link></li>
                            <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            {/* Social icons placeholders */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">F</div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">T</div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">I</div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-12 pt-8 border-t border-gray-800">
                    &copy; 2024 CalmZone. All rights reserved.
                </div>
            </footer>

        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition duration-300">
            <div className="mb-6">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function TestimonialCard({ name, quote, initials }: { name: string, quote: string, initials: string }) {
    return (
        <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 text-primary font-bold rounded-full flex items-center justify-center mr-4">
                    {initials}
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">{name}</h4>
                    <div className="flex text-yellow-400">★★★★★</div>
                </div>
            </div>
            <p className="text-gray-600 italic">"{quote}"</p>
        </div>
    )
}

function PricingCard({ title, price, features, isPremium = false }: { title: string, price: string, features: string[], isPremium?: boolean }) {
    return (
        <div className={`p-8 rounded-2xl shadow-lg ${isPremium ? 'border-2 border-secondary bg-white relative overflow-hidden' : 'bg-white border border-gray-100'}`}>
            {isPremium && <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>}
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-4xl font-bold text-primary mb-6">{price}<span className="text-base text-gray-500 font-normal">/month</span></p>
            <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {feature}
                    </li>
                ))}
            </ul>
            <button className={`w-full py-3 rounded-lg font-bold transition ${isPremium ? 'bg-secondary text-white hover:bg-secondary-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                Choose {title}
            </button>
        </div>
    )
}
