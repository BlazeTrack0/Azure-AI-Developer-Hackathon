import { useEffect, useRef, useState } from "react";
import { initializeMap, setMapControls,updateTileLayer} from '../services/mapServiceWeather';

function WeatherMap() {
    const mapRef = useRef(null);
    const [selectedLayer, setSelectedLayer] = useState('microsoft.weather.radar.main');
    const [map, setMap] = useState(null);



    
    const weatherOptions = [
        { value: 'microsoft.weather.radar.main', label: 'Radar' },
        { value: 'microsoft.weather.infrared.main', label: 'Infrared' }
    ];
    // Haritayı başlatma
    useEffect(() => {
        async function loadMap() {

            console.log(selectedLayer, "selectedLayer");

            const mapInstance = await initializeMap(mapRef,selectedLayer); 
            const coordinates = [];
            setMapControls(mapInstance, coordinates);
            setMap(mapInstance);

            return () => mapInstance.dispose();
        }
        loadMap();
    }, []);

   
    useEffect(() => {
        if (map) {
            console.log(`Layer değişti: ${selectedLayer}`);
            updateTileLayer(selectedLayer);
        }
    }, [selectedLayer]); 


    return (
        <div className="relative w-full h-screen">
            <div ref={mapRef} id="map" className="w-full h-full">
                {/* Harita buraya eklenecek */}
            </div>
            
            {/* Weather Layer Selector */}
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-50">
                <label className="text-gray-700 text-sm font-medium mr-2">
                    Select weather overlay:
                </label>
                <select
                    value={selectedLayer}
                    onChange={(e) => setSelectedLayer(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    {weatherOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default WeatherMap;
