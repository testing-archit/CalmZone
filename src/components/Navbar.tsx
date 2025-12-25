"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Calm<span className="text-secondary">Zone</span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                        <NavLink href="/journal">Journal</NavLink>
                        <NavLink href="/mood">Mood Tracker</NavLink>
                        <NavLink href="/resource">Resources</NavLink>
                        <div className="border-l pl-8 ml-8">
                            <AuthButton />
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white/95 border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
                        <MobileNavLink href="/journal" onClick={() => setIsOpen(false)}>Journal</MobileNavLink>
                        <MobileNavLink href="/mood" onClick={() => setIsOpen(false)}>Mood Tracker</MobileNavLink>
                        <MobileNavLink href="/resource" onClick={() => setIsOpen(false)}>Resources</MobileNavLink>
                    </div>
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-gray-700 hover:text-primary transition-colors font-medium">
            {children}
        </Link>
    );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link href={href} onClick={onClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 text-center w-full">
            {children}
        </Link>
    );
}

function AuthButton() {
    // Note: In a real Next.js app, this component would likely verify session via a server component wrapper or context.
    // For simplicity in this demo, we link to login.
    return (
        <Link href="/login" className="px-5 py-2 rounded-full bg-primary text-white font-bold hover:bg-primary-600 transition">
            Sign In
        </Link>
    );
}
