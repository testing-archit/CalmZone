"use client";

import Link from "next/link";
import { signup } from "@/lib/actions";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signup, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-2xl">
                <div className="text-center">
                    <Link href="/" className="text-4xl font-bold text-primary block mb-2">
                        Calm<span className="text-secondary">Zone</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Create your account</h2>
                </div>

                <form className="mt-8 space-y-6" action={formAction}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm border-t-0"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm border-t-0"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/login" className="font-medium text-secondary hover:text-secondary-600">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>

                    {state?.error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {state.error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition shadow-md"
                        >
                            {isPending ? <Loader2 className="animate-spin" /> : "Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
