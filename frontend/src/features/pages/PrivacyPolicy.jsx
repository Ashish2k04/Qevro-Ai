import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#090d17] text-gray-300">
            <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8 lg:px-10">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Qevro<span className="text-indigo-400">Ai.</span>
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        Privacy Policy
                    </p>
                </div>

                {/* Policy Card */}
                <div className="rounded-2xl border border-gray-800 bg-black/60 p-6 shadow-2xl sm:p-8">

                    <p className="text-sm leading-7 text-gray-400">
                        Last updated: October 1, 2026
                    </p>

                    <div className="mt-8 space-y-8">

                        {/* Introduction */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                1. Introduction
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Welcome to Qevro-Ai. Qevro-Ai is an AI-powered
                                application that allows users to create accounts,
                                have conversations with AI, and manage their
                                conversations.
                            </p>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                This Privacy Policy explains what information we
                                collect, how we use it, how we protect it, and how
                                we handle information obtained through third-party
                                services.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                2. Information We Collect
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                When you use Qevro-Ai, we may collect information
                                that you provide directly to us, including:
                            </p>

                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-400">
                                <li>Username</li>
                                <li>Email address</li>
                                <li>Account authentication information</li>
                                <li>Messages and conversations you create</li>
                                <li>Information required to provide and maintain the service</li>
                            </ul>
                        </section>

                        {/* Google Data */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                3. Google User Data
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Qevro-Ai may use Google OAuth to securely authorize
                                access to Google services required for specific
                                application functionality.
                            </p>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                When Google authorization is used, Qevro-Ai may
                                receive information associated with the Google
                                account and OAuth authorization, such as the
                                authorized account information and authentication
                                tokens required to maintain the authorized
                                connection.
                            </p>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Google OAuth tokens are used only for the
                                functionality for which the user has granted
                                authorization. We do not sell Google user data.
                            </p>
                        </section>

                        {/* How We Use Information */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                4. How We Use Information
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                We use collected information to:
                            </p>

                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-400">
                                <li>Create and manage user accounts</li>
                                <li>Authenticate users</li>
                                <li>Provide AI-powered conversations</li>
                                <li>Store and display user conversations</li>
                                <li>Provide application features and functionality</li>
                                <li>Send required service-related emails</li>
                                <li>Maintain, secure, and improve the application</li>
                            </ul>
                        </section>

                        {/* Email */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                5. Email Services
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Qevro-Ai may use email services to send account
                                verification, authentication, or other
                                service-related emails. Email-related functionality
                                is used to provide the requested application
                                services.
                            </p>
                        </section>

                        {/* Data Storage */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                6. Data Storage and Security
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                We take reasonable technical and organizational
                                measures to protect information stored and processed
                                by Qevro-Ai from unauthorized access, alteration,
                                disclosure, or destruction.
                            </p>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                However, no method of transmission or electronic
                                storage can be guaranteed to be completely secure.
                            </p>
                        </section>

                        {/* Data Sharing */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                7. Data Sharing
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                We do not sell or rent your personal information.
                                Information may be processed by third-party
                                services when necessary to provide Qevro-Ai
                                functionality, such as authentication, AI
                                processing, database hosting, or email delivery.
                            </p>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Third-party services receive only the information
                                necessary for the relevant service to function.
                            </p>
                        </section>

                        {/* AI Conversations */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                8. AI Conversations
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Messages submitted to Qevro-Ai may be processed by
                                AI service providers in order to generate responses
                                and provide AI-powered features.
                            </p>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Users should avoid submitting sensitive personal
                                information that is not necessary for using the
                                service.
                            </p>
                        </section>

                        {/* Cookies */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                9. Cookies and Authentication
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                Qevro-Ai may use cookies or similar technologies
                                required for authentication, maintaining secure
                                sessions, and providing application functionality.
                            </p>
                        </section>

                        {/* User Rights */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                10. Your Choices
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                You may stop using Qevro-Ai at any time. You may
                                also request information about your account data or
                                request deletion of your account and associated
                                information, subject to applicable legal or
                                operational requirements.
                            </p>
                        </section>

                        {/* Changes */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                11. Changes to This Privacy Policy
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                We may update this Privacy Policy when our
                                application, services, or data practices change.
                                The updated version will be published on this page
                                with a revised "Last updated" date.
                            </p>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="text-xl font-semibold text-white">
                                12. Contact Us
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                                If you have questions about this Privacy Policy or
                                how Qevro-Ai handles your information, you can
                                contact us through the support email associated
                                with the application.
                            </p>
                        </section>

                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-600">
                        © 2026 Qevro-Ai. All rights reserved.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicy;