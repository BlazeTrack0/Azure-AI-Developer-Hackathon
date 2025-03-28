import { useEffect, useRef, useState } from "react";
import { initializeMap, setMapControls } from '../services/mapService3'

function HeatMap() {
    const mapRef = useRef(null);
    const [isInfoVisible, setIsInfoVisible] = useState(true);

    useEffect(() => {
        const map = initializeMap(mapRef);
        const coordinates = [];
        setMapControls(map, coordinates);

        console.log("Her şey çalıştı sorun yok mu ?")

        return () => map.dispose();
    }, [])

    return (
        <div className="relative w-full h-screen">
            <div ref={mapRef} id="map" className="w-full h-full">
                {/* Harita buraya eklenecek */}
            </div>

            
            {isInfoVisible ? (
                <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg max-w-md">
                    <button 
                        onClick={() => setIsInfoVisible(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold mb-2">Heat Map Information</h2>
                    <p className="text-gray-700">
                        This map is a heat map showing fire intensity.
                        Red areas indicate high-risk zones,
                        yellow areas indicate medium-risk zones.
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

export default HeatMap;
