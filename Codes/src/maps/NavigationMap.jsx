import { useEffect, useRef, useState } from "react";
import { initializeMap, setMapControls } from '../services/mapService4'

function NavigationMap() {
    const mapRef = useRef(null);
    const [isInfoVisible, setIsInfoVisible] = useState(true);
    const [timeFrame, setTimeFrame] = useState('1');
    useEffect(() => {

        async function loadMap() {

        const map = await initializeMap(mapRef,timeFrame); 
        const coordinates = [];
        console.log(map, "map-controls-function")
        setMapControls(map, coordinates);

        return () => map.dispose();
        }

        loadMap();


    }, [timeFrame])

    return (
        <div className="relative w-full h-screen">
            <div ref={mapRef} id="map" className="w-full h-full">
                {/* Harita buraya eklenecek */}
            </div>


            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg p-2 flex gap-2">
                <button 
                    onClick={() => setTimeFrame('1')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        timeFrame === '1' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    1 Hour
                </button>
                <button 
                    onClick={() => setTimeFrame('5')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        timeFrame === '5' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    5 Hours
                </button>
                <button 
                    onClick={() => setTimeFrame('10')}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        timeFrame === '10' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    10 Hours
                </button>
            </div>
        
            
            {isInfoVisible ? (
                <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg max-w-md">
                    <button 
                        onClick={() => setIsInfoVisible(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold mb-2">Navigation Map Information</h2>
                    <p className="text-gray-700">
                        This is a map used for navigation purposes.
                        The map shows water collection points and routes to be taken when responding to fires.
                    </p>
                </div>
            ) : (
                <button 
                    onClick={() => setIsInfoVisible(true)}
                    className="absolute bottom-8 right-8 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                >
                    <span className="text-xl">ℹ️</span>
                </button>
            )}
        </div>
    )
}

export default NavigationMap;
