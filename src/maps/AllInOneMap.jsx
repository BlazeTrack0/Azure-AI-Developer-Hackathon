import React, { useRef, useEffect,useState } from 'react';
import coordinates from '../commons/coordinates.json';

import { initializeMap as initializeMap1, setMapControls as setMapControls1} from '../services/mapService1';
import { initializeMap as initializeMap2, setMapControls as setMapControls2} from '../services/mapService2';
import { initializeMap as initializeMap3, setMapControls as setMapControls3} from '../services/mapService3';
import { initializeMap as initializeMap4, setMapControls as setMapControls4} from '../services/mapService4';
import { initializeMap as initializeMap5, setMapControls as setMapControls5, updateTileLayer} from '../services/mapServiceWeather';


function AllInOneMap() {
    const mapRef = useRef(null);
    const [selectedMapType, setSelectedMapType] = useState(1);
    const [isControlsVisible, setIsControlsVisible] = useState(false);
    const [timeFrame, setTimeFrame] = useState('1');
    const [selectedLayer, setSelectedLayer] = useState('microsoft.weather.radar.main');
 
    useEffect(() => {
        console.log('Selected map state => ', selectedMapType);
        

        async function initializeMaps() {

        let map = initializeMap1(mapRef,timeFrame);   

        switch(selectedMapType){
            case 1:
                 map = initializeMap1(mapRef,timeFrame); 
                setMapControls1(map, coordinates,timeFrame);
                break;
            case 2:

                break;
            case 3:
                map = initializeMap3(mapRef); 
                setMapControls3(map, coordinates);
                break;
            case 4:
                map = await initializeMap4(mapRef,timeFrame); 
                setMapControls4(map, coordinates);
                break;
            case 5:
                break;
            default:
                map = initializeMap1(mapRef,timeFrame); 
                setMapControls1(map, coordinates,timeFrame);
                break; 
        }

        return () => map.dispose();

        }

       

        initializeMaps();

        

        
    }, [selectedMapType]);





    return (
        <div className="relative h-screen bg-gray-100">
            {/* Harita Alanı - Tam ekran */}
            <div className="w-full h-full">
                <div 
                    ref={mapRef} 
                    id="map" 
                    className={`h-full w-full ${selectedMapType === 2 || selectedMapType === 5 ? 'hidden' : ''}`}
                >
                    {/* Harita buraya eklenecek */}
                </div>
                
                {selectedMapType === 2 && (
                    <div className=" h-full top-[50px]">
                        <iframe 
                            title="Google" 
                            src="https://windmap.z13.web.core.windows.net/"
                            className="h-full w-full" 
                        />
                    </div>
                )}


                {selectedMapType === 5 && (
                    <div className="h-full ">
                        <iframe 
                            title="Google" 
                            src="https://windmap.blob.core.windows.net/weathermap/index.html"
                            className="h-full w-full" 
                        />
                    </div>
                )}
            </div>

            {/* Toggle Butonu - Kontroller kapalıyken görünür */}
            {!isControlsVisible && (
                <button
                    onClick={() => setIsControlsVisible(true)}
                    className="absolute bottom-4 right-4 z-50 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            )}

            {/* Harita Kontrolleri - Absolute pozisyonlu */}
            {isControlsVisible && (
                <div className="absolute bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 w-80">
                    {/* Çarpı İşareti */}
                    <button 
                        onClick={() => setIsControlsVisible(false)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setSelectedMapType(1)}
                            className={`p-2 rounded-lg text-xs font-medium transition-all col-span-1
                                ${selectedMapType === 1 
                                    ? 'bg-blue-500 text-white shadow-sm' 
                                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            Spreading
                        </button>
                        <button
                            onClick={() => setSelectedMapType(2)}
                            className={`p-2 rounded-lg text-xs font-medium transition-all col-span-1
                                ${selectedMapType === 2 
                                    ? 'bg-blue-500 text-white shadow-sm' 
                                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            Wind
                        </button>
                        <button
                            onClick={() => setSelectedMapType(3)}
                            className={`p-2 rounded-lg text-xs font-medium transition-all col-span-1
                                ${selectedMapType === 3 
                                    ? 'bg-blue-500 text-white shadow-sm' 
                                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            Heat
                        </button>
                        <button
                            onClick={() => setSelectedMapType(4)}
                            className={`p-2 rounded-lg text-xs font-medium transition-all col-span-1
                                ${selectedMapType === 4 
                                    ? 'bg-blue-500 text-white shadow-sm' 
                                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            Navigation
                        </button>
                        <button
                            onClick={() => setSelectedMapType(5)}
                            className={`p-2 rounded-lg text-xs font-medium transition-all col-span-1
                                ${selectedMapType === 5 
                                    ? 'bg-blue-500 text-white shadow-sm' 
                                    : 'bg-white border border-gray-200 hover:bg-gray-100'
                                }`}
                        >
                            Weather
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllInOneMap;