import React from 'react';

function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-8 py-16 text-gray-700 mt-16">
            <div className="text-center mb-16 pb-8 border-b-2 border-gray-200">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
                <p className="text-xl text-gray-600">Fire Detection and Response Optimization with Artificial Intelligence</p>
            </div>
            
            <div className="space-y-12">
                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Our Mission</h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        We work to detect fires early, optimize response processes, and make our society 
                        safer using modern technology and artificial intelligence solutions.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Our Vision</h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        To be a pioneer in fire safety using artificial intelligence technologies and 
                        provide innovative solutions to minimize loss of life and property.
                    </p>
                </section> 

                <section>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500 inline-block">Our Technology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Fire Detection with AI</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We detect fires in real-time using advanced image processing 
                                and artificial intelligence algorithms.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Response System</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our AI-powered decision support system provides fire response teams 
                                with the most effective intervention strategies.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Risk Analysis and Prevention</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We enable preventive measures by identifying fire risks in advance 
                                through data analytics and machine learning.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Image Section */}
                <section className="mt-16"> 
                    <div className="w-full">

                        <h3 className='text-2xl font-bold text-gray-800 mb-4 text-center pb-4'>The Team</h3>

                        <img 
                            src="/team_photo.png" 
                            alt="About Us Overview"
                            className="w-full h-[550px] object-cover rounded-xl "
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AboutPage;