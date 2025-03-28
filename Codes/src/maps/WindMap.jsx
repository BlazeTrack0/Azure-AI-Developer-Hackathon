import { useEffect, useRef, useState } from "react";
import * as atlas from 'azure-maps-control';



function WindMap() {
    const mapRef = useRef(null);
    const [layer, setLayer] = useState(null);
    const [timer, setTimer] = useState(null);
    const [displayMessage, setDisplayMessage] = useState('');
    const [showWaterSources, setShowWaterSources] = useState(false);
    const [showOutpostSources, setShowOutpostSources] = useState(false);

    // Weather layer configurations
    const weatherLayers = {
        'microsoft.weather.infrared.main': {
            interval: 10 * 60 * 1000, //10 minute interval
            past: 3 * 60 * 60 * 1000, //Data available up to 3 hours in the past.
            future: 0 //Forecast data not available
        },
        'microsoft.weather.radar.main': {
            interval: 5 * 60 * 1000, //5 minute interval
            past: 1.5 * 60 * 60 * 1000, //Data available up to 1.5 hours in the past.
            future: 1.5 * 60 * 60 * 1000 //Data available up to 1.5 hours in the future.
        }
    };

    const urlTemplate = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId={tilesetId}&zoom={z}&x={x}&y={y}&timeStamp={timeStamp}&tileSize=256&view=Auto';

    useEffect(() => {


        const map = new atlas.Map(mapRef.current, {
            center: [-95, 40],
            zoom: 3,
            style: 'grayscale_dark',
            view: 'Auto',
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: AZURE_MAP_KEY
            }
        });

        map.events.add('ready', () => {
            loadWeatherLayer(map, 'microsoft.weather.radar.main');
        });

        return () => {
            if (timer) clearInterval(timer);
            if (layer) layer.dispose();
            map.dispose();
        };
    }, []);

    const createTileLayer = (tilesetId, time) => {
        const timestamp = new Date(time).toISOString().slice(0, 19);
        return {
            tileUrl: urlTemplate.replace('{tilesetId}', tilesetId).replace('{timeStamp}', timestamp),
            tileSize: 256,
            opacity: 0.9,
            maxSourceZoom: 15
        };
    };

    const loadWeatherLayer = (map, tilesetId) => {
        if (layer) {
            layer.stop();
            if (timer) clearInterval(timer);
        }

        const now = new Date().getTime();
        const layerInfo = weatherLayers[tilesetId];
        const numTimestamps = (layerInfo.past + layerInfo.future) / layerInfo.interval;
        const tlOptions = [];
        const messages = [];

        for (let i = 0; i < numTimestamps; i++) {
            const time = (now - layerInfo.past) + (i + 1) * layerInfo.interval;
            tlOptions.push(createTileLayer(tilesetId, time));

            if (time === now) {
                messages.push('Current');
            } else {
                const dt = (time - now) / 1000 / 60;
                messages.push(`${dt} minutes`);
            }
        }

        const newLayer = new atlas.layer.AnimatedTileLayer();

        map.events.add('onframe', newLayer.getPlayableAnimation(), (e) => {
            if (e.frameIdx >= 0) {
                setDisplayMessage(messages[e.frameIdx]);
            }
        });

        map.layers.add(newLayer, 'labels');
        setLayer(newLayer);

        const newTimer = setInterval(() => {
            const time = (now - layerInfo.past) + (numTimestamps + 1) * layerInfo.interval;
            tlOptions.shift();
            tlOptions.push(createTileLayer(tilesetId, time));
            newLayer.setOptions({ tileLayerOptions: tlOptions });
        }, layerInfo.interval);

        setTimer(newTimer);
    };

    const handleLayerChange = (e) => {
        const tilesetId = e.target.value;
        loadWeatherLayer(mapRef.current.map, tilesetId);
    };

    const handleSpeedChange = (e) => {
        const speed = parseFloat(e.target.value);
        if (layer) {
            layer.setOptions({ speedMultiplier: speed });
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div ref={mapRef} className="w-full h-full" />

            {/* Controls Panel */}
            <div className="absolute top-[100px] left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="mb-2">
                    <label className="block mb-1 text-xs">Weather overlay:</label>
                    <select 
                        onChange={handleLayerChange}
                        className="w-full p-1.5 text-sm border rounded"
                    >
                        <option value="microsoft.weather.radar.main">Radar</option>
                        <option value="microsoft.weather.infrared.main">Infrared</option>
                    </select>
                </div>

                <div className="flex gap-1 mb-2">
                    <button 
                        onClick={() => layer?.play()}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Play
                    </button>
                    <button 
                        onClick={() => layer?.pause()}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Pause
                    </button>
                    <button 
                        onClick={() => layer?.stop()}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Stop
                    </button>
                    <button 
                        onClick={() => layer?.reset()}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Reset
                    </button>
                </div>

                <div>
                    <label className="block mb-1 text-xs">Speed:</label>
                    <select 
                        onChange={handleSpeedChange}
                        className="w-full p-1.5 text-sm border rounded"
                        defaultValue="1"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="5">5x</option>
                    </select>
                </div>
            </div>

            

            {/* Message Panel */}
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                {displayMessage}
            </div>
        </div>
    );
}

export default WindMap;
