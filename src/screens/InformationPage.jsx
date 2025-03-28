import React from 'react';

function InformationPage() {
    return (
        <div className="min-h-screen  text-white">
            <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-28 pb-16">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">What to Do in Case of Fire?</h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Fires spread rapidly and can cause severe damage. Acting consciously is crucial to ensuring safety.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Steps Section */}
                    <div className="bg-[#404040] p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6 text-orange-500">
                            <span className="mr-2">🔥</span>Steps to Take During a Fire
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <div>
                                    <span className="font-semibold">Stay Calm:</span>
                                    <span className="text-gray-400"> Avoid panic and evaluate the safest exit routes.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <div>
                                    <span className="font-semibold">Activate the Fire Alarm:</span>
                                    <span className="text-gray-400"> If you're in a building, trigger the fire alarm immediately.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <div>
                                    <span className="font-semibold">Report the Emergency:</span>
                                    <span className="text-gray-400"> Call 112 (or your local emergency number) and provide details about the fire's location and intensity.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <div>
                                    <span className="font-semibold">Evacuate Safely:</span>
                                    <span className="text-gray-400"> Use designated escape routes to leave the area as quickly as possible.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <div>
                                    <span className="font-semibold">Avoid Smoke Exposure:</span>
                                    <span className="text-gray-400"> Smoke rises, so stay low to the ground and cover your mouth with a damp cloth.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <div>
                                    <span className="font-semibold">Do Not Use Elevators:</span>
                                    <span className="text-gray-400"> Elevators may become inoperable or fill with smoke during a fire.</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Fire Types Section */}
                    <div className="bg-[#404040] p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6 text-orange-500">
                            <span className="mr-2">🔥</span>Types of Fire and How to Extinguish Them
                        </h2>
                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold mb-2">Class A Fires</h3>
                                <p className="text-gray-400">Solid materials (paper, wood, textiles). Use water or dry chemical extinguishers.</p>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold mb-2">Class B Fires</h3>
                                <p className="text-gray-400">Flammable liquids (gasoline, alcohol, oils). Use foam or dry chemical extinguishers.</p>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold mb-2">Class C Fires</h3>
                                <p className="text-gray-400">Gas-based fires (natural gas, LPG). Shut off the gas source and use dry chemical extinguishers.</p>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold mb-2">Class D Fires</h3>
                                <p className="text-gray-400">Combustible metals (magnesium, aluminum, sodium). Do not use water; specialized extinguishing powders are required.</p>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold mb-2">Class E Fires</h3>
                                <p className="text-gray-400">Electrical fires (wiring, circuit panels). Turn off the power supply and use CO₂ or dry chemical extinguishers.</p>
                            </div>
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="font-semibold mb-2">Class F Fires</h3>
                                <p className="text-gray-400">Kitchen and oil fires (vegetable and animal fats). Do not use water; use special kitchen fire extinguishers instead.</p>
                            </div>
                        </div>
                    </div>

                    {/* Wildfire Section - Full Width */}
                    <div className="bg-[#404040] p-8 rounded-lg lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 text-orange-500">
                            <span className="mr-2">🌲</span>Wildfires and Precautionary Measures
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <p className="text-gray-400">
                                    Wildfires can rapidly spread over vast areas, causing significant harm to ecosystems and wildlife.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✅</span>
                                        <span className="text-gray-400">Avoid Lighting Fires in Open Areas: If you light a fire while camping or picnicking, ensure it is completely extinguished before leaving. Never light fires on windy days.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✅</span>
                                        <span className="text-gray-400">Be Careful with Cigarette Butts: Refrain from smoking in forests or grassy areas. If you do smoke, never discard cigarette butts on the ground.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✅</span>
                                        <span className="text-gray-400">Do Not Leave Glass Bottles or Waste: Glass bottles can magnify sunlight and ignite dry grass, leading to fires.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✅</span>
                                        <span className="text-gray-400">Be Cautious with Vehicle Exhausts: Hot exhaust pipes can ignite dry grass. Avoid parking over vegetation.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✅</span>
                                        <span className="text-gray-400">Inspect Electrical Lines and Infrastructure: Ensure power lines, especially in rural areas, are well-maintained to prevent electrical sparks.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-[#404040] p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">
                                    <span className="mr-2">🏃</span>How to Escape a Wildfire?
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚨</span>
                                        <span className="text-gray-400">Move Against the Wind: Fires spread in the direction of the wind. Move in the opposite direction toward a safer area.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚨</span>
                                        <span className="text-gray-400">Seek Open Areas: Avoid dense forests and head towards clearings or less vegetated regions.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚨</span>
                                        <span className="text-gray-400">Move to Lower Ground: Fires tend to move uphill. Seek valleys or lower terrain for better safety.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚨</span>
                                        <span className="text-gray-400">Head Toward Water Sources: If a river, lake, or large water body is nearby, move toward it for protection.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚨</span>
                                        <span className="text-gray-400">Avoid Smoke Inhalation: Cover your mouth and nose with a damp cloth to reduce the risk of smoke inhalation.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Animal Safety Section */}
                    <div className="bg-[#404040] p-8 rounded-lg lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 text-orange-500">
                            <span className="mr-2">🐾</span>What Should Animals Do in Wildfires?
                        </h2>
                        <p className="text-gray-400 mb-4">Wildfires pose a serious threat not only to humans but also to animals.</p>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <span className="text-gray-400">Ensure the Safety of Pets: Move domestic animals to a secure area and avoid leaving them loose in dangerous zones.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <span className="text-gray-400">Help Wildlife Escape: If you see wild animals fleeing, do not obstruct their path. If possible, leave water for them.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">✅</span>
                                <span className="text-gray-400">Report Injured or Burned Animals: Notify authorities if you encounter injured wildlife.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Prevention Measures Section */}
                    <div className="bg-[#404040] p-8 rounded-lg lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 text-orange-500">
                            <span className="mr-2">🔥</span>Fire Prevention Measures
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                "Keep fire extinguishers at home and in workplaces",
                                "Regularly inspect electrical wiring and circuits",
                                "Ensure cigarette butts are completely extinguished",
                                "Identify fire exits and emergency evacuation routes",
                                "Store flammable and explosive materials safely",
                                "Participate in fire drills to stay prepared"
                            ].map((measure, index) => (
                                <div key={index} className="bg-[#404040] p-4 rounded-lg">
                                    <span className="text-green-500 mr-2">✔</span>
                                    <span className="text-gray-400">{measure}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationPage;
