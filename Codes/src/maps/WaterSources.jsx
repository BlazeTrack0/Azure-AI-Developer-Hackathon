import { useEffect, useRef, useState } from "react";
import { getGenericMapWater,setMapControls } from '../services/genericMapServiceWater';

function WaterSources() {
    const mapRef = useRef(null);
    const [isInfoVisible, setIsInfoVisible] = useState(true);
    const [timeFrame, setTimeFrame] = useState('1'); // '1', '5', '10' saat
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [tempData,setTempData] = useState(0);

    useEffect(() => {


        console.log(latitude, longitude, "latitude and longitude")

        const map = getGenericMapWater(mapRef,timeFrame,latitude,longitude);

        

        setMapControls(map);


        return () => map.dispose();
    }, [timeFrame,tempData]);

    const handleSearch = () => {
        if (latitude && longitude) {
            setTimeFrame(prev => prev);
            setTempData(prev => prev+1);
        }
    };

    return (
        <div className="relative w-full h-screen">
            {/* Harita Container */}
            <div ref={mapRef} id="map" className="w-full h-full">
                {/* Harita buraya eklenecek */}
            </div>

            {/* Zaman Kontrol Paneli */}
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

            {/* Bilgi Paneli */}
            {isInfoVisible  && (
                <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-4 max-w-md">
                    <button 
                        onClick={() => setIsInfoVisible(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    
                    
                </div>
            )}

            {/* Bilgi Butonu */}
            {!isInfoVisible && (
                <button 
                    onClick={() => setIsInfoVisible(true)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full border border-gray-200 hover:border-blue-500"
                >
                    <span className="text-xl">ℹ️</span>
                </button>
            )}

            {/* Koordinat Arama Paneli */}
            <div className="absolute top-[100px] left-4 bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-2">
                    <div>
                        <label className="block text-sm text-gray-600">Enlem (Latitude)</label>
                        <input
                            type="text"
                            placeholder="41.0082"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Boylam (Longitude)</label>
                        <input
                            type="text"
                            placeholder="28.9784"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Ara
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WaterSources;
