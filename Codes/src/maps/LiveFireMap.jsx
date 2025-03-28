import { useEffect, useRef, useState } from "react";
import { getGenericMap,setMapControls } from '../services/genericMapService';
import { fetchAllSources,fetchData } from '../services/dataService';

function LiveFireMap() {
    const mapRef = useRef(null);
    const [isInfoVisible, setIsInfoVisible] = useState(true);
    const [timeFrame, setTimeFrame] = useState('1'); // '1', '5', '10' saat
    const [mapData, setMapData] = useState(null);
    const [showWaterSources, setShowWaterSources] = useState(true);
    const [showOutpostSources, setShowOutpostSources] = useState(true);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [tempData, setTempData] = useState(0);
    const [allSources, setAllSources] = useState(null);



    const changeDataService = async (latitude,longitude) => {
        try {
            const response = await fetchAllSources(latitude,longitude);
            console.log('Tüm kaynakları verisi:', response.data);
            return response.data;
        } catch (error) {
            console.error('Tüm kaynakları verisi alınırken hata oluştu:', error);
            return null;
        }
      };

    useEffect(() => {

            const fetchedSources = fetchData();
            const map =  getGenericMap(mapRef,timeFrame,showWaterSources,showOutpostSources,latitude,longitude,fetchedSources);
            console.log(fetchedSources, "allSources in useEffect")
            setMapControls(map);
            updateMapData(timeFrame,fetchedSources);
            setAllSources(fetchedSources);
            
        
        return () => map.dispose();
        
    }, [timeFrame, showWaterSources, showOutpostSources,tempData]);



    const handleSearch = async () => {
        if (latitude && longitude) {
            setTimeFrame(prev => prev);
            setTempData(prev => prev+1);
            const allSources = await changeDataService(latitude,longitude);
            setAllSources(allSources);
            updateMapData(timeFrame,allSources);
        }
    };

    const updateMapData = (selectedTime,allSources) => {
        console.log(allSources, "allSources")

        if( allSources !== null && allSources !== undefined){

            allSources = allSources[0];

            const data = {
                waterSources: allSources[`water_sources_${selectedTime}hour`] || "Loading...",
                outpostSources: allSources[`outpost_sources_${selectedTime}hour`] || "Loading...",
                populationNumber: allSources[`population_number_${selectedTime}hour`] || "Loading...",
                animalNumber: allSources[`animal_number_${selectedTime}hour`] || "Loading...",
                estArea: allSources[`est_area_${selectedTime}hour`] || "Loading...",
                estInventory: allSources[`est_inventory_${selectedTime}hour`] || "Loading...",
            };
            setMapData(data);
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
            {isInfoVisible && mapData && (
                <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg p-4 max-w-md">
                    <button 
                        onClick={() => setIsInfoVisible(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Fire Information ({timeFrame} Hours)</h2>
                    
                    {/* Katman Kontrolleri */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                        <h3 className="font-semibold mb-2 text-gray-700">Layer Controls:</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showWaterSources}
                                    onChange={(e) => setShowWaterSources(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-700">Water Sources</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showOutpostSources}
                                    onChange={(e) => setShowOutpostSources(e.target.checked)}
                                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-700">Outpost Points</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p><strong>Estimated Area:</strong> {mapData.estArea[0]} m²</p>
                        <p><strong>Water Sources:</strong> {mapData.waterSources.length} units</p>
                        <p><strong>Outposts:</strong> {mapData.outpostSources.length} units</p>
                        
                        {/* Risk Altındaki İnsan Sayısı */}
                        <div className="p-3 bg-red-50 rounded-md border border-red-100">
                            <h3 className="font-semibold mb-2 text-red-800">People at Risk:</h3>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-700">
                                    {mapData.populationNumber[0] || "0"}
                                </div>
                                <div className="text-sm text-gray-600">people</div>
                            </div>
                        </div>

                        {/* Hayvan Sayısı Bilgisi */}
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                            <h3 className="font-semibold mb-2 text-blue-800">Animals at Risk:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Cow</div>
                                    <div className="font-bold text-blue-700">{mapData.animalNumber.cow_number}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Sheep</div>
                                    <div className="font-bold text-blue-700">{mapData.animalNumber.sheep_number}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Chicken</div>
                                    <div className="font-bold text-blue-700">{mapData.animalNumber.chicken_number}</div>
                                </div>
                            </div>
                        </div>

                        {/* Ekipman Durumu */}
                        <div className="p-3 bg-green-50 rounded-md border border-green-100">
                            <h3 className="font-semibold mb-2 text-green-800">Equipment Status:</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-600">Personnel</div>
                                    <div className="font-bold text-green-700">{mapData.estInventory.total_people}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Vehicle</div>
                                    <div className="font-bold text-green-700">{mapData.estInventory.engine}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Helicopter</div>
                                    <div className="font-bold text-green-700">{mapData.estInventory.helicopter}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Backup Vehicle</div>
                                    <div className="font-bold text-green-700">{mapData.estInventory.backing_engine}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

<div className="absolute top-[100px] left-4 bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-2">
                    <div>
                        <label className="block text-sm text-gray-600">Latitude</label>
                        <input
                            type="text"
                            placeholder="41.0082"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Longitude</label>
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
                        Search
                    </button>
                </div>
            </div>

            {/* Bilgi Butonu */}
            {!isInfoVisible && (
                <button 
                    onClick={() => setIsInfoVisible(true)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full border border-gray-200 hover:border-blue-500"
                >
                    <span className="text-xl">ℹ️</span>
                </button>
            )}
        </div>
    );
}

export default LiveFireMap;
