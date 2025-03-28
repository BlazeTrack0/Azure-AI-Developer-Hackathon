import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LineGraph from '../graphs/LineGraph';
import BarChart from '../graphs/BarChart';
import { fetchData } from '../services/dataService';

const HomePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('YANGN_HARITALARI');
    const [activeCategoryTab, setActiveCategoryTab] = useState('YANGN_HARITALARI');
    const [data,setData] = useState();

    useEffect(() => {
        const data = fetchData();
        console.log(data[0].animal_number_1hour, "data");
        setData(data[0]);
    }, []);



    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            {/* Project Summary Section */}
            <section className="mb-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">About Blaze Track</h2>
                    <div className="space-y-4">
                        <p className="text-lg leading-relaxed">
                            The Blaze Track project has been developed to ensure fire control during and after a fire 
                            and to provide guidance in this regard. In this process, the goal is to minimize the damage 
                            caused by large fires to humanity, nature, and animals.
                        </p>
                        <p className="text-lg leading-relaxed">
                            As a team, we have been in communication with professional institutions and organizations, 
                            gathering and evaluating the necessary information. We analyze all data using Microsoft Azure 
                            and AI-supported algorithms to prepare presentations for you.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our team consists of TOBB ETÜ students. The sources utilized are provided in the attachment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Analytics Section */}
            <section className="mb-12">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Fire Analytics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="p-6 rounded-lg shadow-lg">
                            <LineGraph 
                                subtext="Estimate by 1,5,10 hours" 
                                title="Population Estimation by Hour" 
                                element1={data?.population_number_1hour} 
                                element2={data?.population_number_5hour} 
                                element3={data?.population_number_10hour}
                            />
                        </div>
                        <div className="p-6 rounded-lg shadow-lg">
                            <BarChart 
                                type="animal" 
                                element1h={data?.animal_number_1hour} 
                                element5h={data?.animal_number_5hour} 
                                element10h={data?.animal_number_10hour}
                                text="Animal Number"
                            />
                        </div>
                        <div className="p-6 rounded-lg shadow-lg">
                            <LineGraph 
                                title="Area Estimation by Hour" 
                                subtext="Estimate by 1,5,10 hours" 
                                element1={data?.est_area_1hour} 
                                element2={data?.est_area_5hour} 
                                element3={data?.est_area_10hour}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section */}
            <section className="mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Live Fire Map</h2>
                    <div className="overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <div onClick={() => navigate('/live-fire-map')} className="block relative">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                                <div className="p-4 absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-xl font-semibold mb-2">
                                        Go To Live Fire Map
                                    </span>
                                    <span className="text-white text-sm">
                                        Click and see the detailed map
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="w-full h-[600px]" >
                                
                                    <img 
                                        src="Ai_forestFire.jpg" 
                                        alt="Live Fire Map" 
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
