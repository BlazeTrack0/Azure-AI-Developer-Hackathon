import React from 'react';
import { useNavigate } from 'react-router-dom';

function MapPage() {
    const navigate = useNavigate();

    const aiMaps = [
        {
            title: "Live Fire Map",
            description: "Real-time fire detection and monitoring",
            icon: "🔥",
            path: "/live-fire-map"
        },
        {
            title: "Water Sources Map",
            description: "Available water sources for firefighting",
            icon: "💧",
            path: "/water-sources-map"
        },
        {
            title: "Outpost Sources Map",
            description: "Fire stations and emergency response units",
            icon: "🚒",
            path: "/outpost-sources-map"
        },
    ];

    const standardMaps = [
        {
            title: "Weather Map",
            description: "Current weather conditions and forecasts",
            icon: "🌤️",
            path: "/weather-map"
        },
        {
            title: "Wind Map",
            description: "Wind direction and speed visualization",
            icon: "💨",
            path: "/wind-map"
        },
        {
            title: "Heat Map",
            description: "Temperature distribution and hot spots",
            icon: "🌡️",
            path: "/heat-map"
        },         
        {
            title: "Spreading Map",
            description: "Fire spread prediction and analysis",
            icon: "📈",
            path: "/spreading-map"
        },
        {
            title: "Navigation Map",
            description: "Route planning and navigation",
            icon: "🗺️",
            path: "/navigation-map"
        },
        {
            title: "All In One Map",
            description: "Comprehensive view of all data layers",
            icon: "🎯",
            path: "/all-in-one"
        }
    ];

    return (
        <div className="mt-[50px] container mx-auto px-8 py-12">
            {/* AI Maps Section */}
            <div className="mb-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">AI-Powered Maps</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Advanced mapping solutions powered by artificial intelligence, providing real-time analysis 
                        and predictive insights for enhanced fire management and response capabilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {aiMaps.map((map, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(map.path)}
                            className="p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 duration-200 border-t-4 border-blue-500"
                        >
                            <div className="flex flex-col h-[200px] justify-between">
                                <div>
                                    <div className="text-4xl mb-4">{map.icon}</div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {map.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {map.description}
                                    </p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                        View Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Standard Maps Section */}
            <div>
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Standard Maps</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Traditional mapping tools providing essential geographical and environmental data 
                        for comprehensive situational awareness and planning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {standardMaps.map((map, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(map.path)}
                            className="p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 duration-200 border-t-4 border-green-500"
                        >
                            <div className="flex flex-col h-[200px] justify-between">
                                <div>
                                    <div className="text-4xl mb-4">{map.icon}</div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        {map.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {map.description}
                                    </p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                        View Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MapPage;