import React from 'react';

function HelpPage() {
    return (
        <div className="max-w-7xl mx-auto px-8 py-16 text-gray-700 mt-16">
            <div className="text-center mb-16 pb-8 border-b-2 border-gray-200">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
                <p className="text-xl text-gray-600">How can we help you?</p>
            </div>
            
            <div className="space-y-12">
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">How does the system work?</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our system analyzes satellite images and sensor data using advanced artificial intelligence algorithms. 
                                When potential fire situations are detected, it immediately notifies authorities and provides intervention recommendations.
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">How do notifications work?</h3>
                            <p className="text-gray-600 leading-relaxed">
                                When our system detects a fire, it immediately notifies registered authorities via SMS, email, and 
                                app notifications. Notifications include the fire's location, intensity, and recommended intervention methods.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Support Channels</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">24/7 Technical Support</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Our technical team is ready to help you around the clock.
                            </p>
                            
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Email Support</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You can reach us via email for your questions.
                            </p>
                            <p className="text-blue-600 font-medium">✉️ destek@yanginsistemi.com</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Support</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                You can get help from our live support line during business hours.
                            </p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                                Connect to Live Support
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">User Guide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Getting Started Guide</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="mr-2">1.</span>
                                    Log in to the system
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">2.</span>
                                    Select your region
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">3.</span>
                                    Set your notification preferences
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">4.</span>
                                    Start monitoring through the map
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Information</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    System updates every 5 minutes
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    Internet connection required for notifications
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    Location permission is recommended
                                </li>
                                <li className="flex items-center">
                                    <span className="mr-2">•</span>
                                    Reports can be downloaded in PDF format
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HelpPage;