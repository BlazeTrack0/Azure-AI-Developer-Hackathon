        
        
        import * as atlas from 'azure-maps-control';

        
        var map, layer, timer;
        var now = new Date().getTime();
        var tlOptions = [];
        var i = 0

        //Base weather tile layer URL for radar data. {azMapsDomain} is a placeholder that is set automatically by the map, and will also automatically append the map credentials to the request.
        var urlTemplate = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId={tilesetId}&zoom={z}&x={x}&y={y}&timeStamp={timeStamp}&tileSize=256&view=Auto';

        //Details on the availability of the different weather layers.
        var weatherLayers = {
            'microsoft.weather.infrared.main': {
                interval: 10 * 60 * 1000, //10 minute interval
                past: 3 * 60 * 60 * 1000, //Data available up to 3 hours in the past.
                future: 0 //Forecast data not avaiable.
            },
            'microsoft.weather.radar.main': {
                interval: 5 * 60 * 1000, //5 minute interval
                past: 1.5 * 60 * 60 * 1000, //Data available up to 1.5 hours in the past.
                future: 1.5 * 60 * 60 * 1000 //Data available up to 1.5 hours in the future.
            }
        };

        var displayMessages = [];

        export const initializeMap = (mapRef) => {
            //Initialize a map instance.
            map = new atlas.Map(mapRef.current, {
                center: [-95, 40],
                zoom: 3,
                style: 'grayscale_dark',
                view: 'Auto',

                //Add authentication details for connecting to Azure Maps.
                authOptions: {
                    //Use Microsoft Entra ID authentication.
                    authType: 'anonymous',
                    clientId: 'e6b6ab59-eb5d-4d25-aa57-581135b927f0', //Your Azure Maps client id for accessing your Azure Maps account.
                    authType: 'subscriptionKey',
                    subscriptionKey: AZURE_MAP_KEY

                    //Alternatively, use an Azure Maps key. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
                    //authType: 'subscriptionKey',
                    //subscriptionKey: '[YOUR_AZURE_MAPS_KEY]'
                }
            });

            //Wait until the map resources are ready.
            map.events.add('ready', function () {
                //Load the radar layer by default.
                loadWeatherLayer('microsoft.weather.radar.main');
            });
        }

        function loadWeatherLayer(tilesetId) {
            //If there is already a layer, stop it animating.
            if (layer) {
                layer.stop();
                clearInterval(timer);
            }

            //Get the current time.
            

            //Get the details for the requested weather layer.
            var layerInfo = weatherLayers[tilesetId];

            //Calculate the number of timestamps.
            var numTimestamps = (layerInfo.past + layerInfo.future) / layerInfo.interval;

           

            for (; i < numTimestamps; i++) {
                //Calculate time period for an animation frame. Shift the interval by one as the olds tile will expire almost immediately.
                var time = (now - layerInfo.past) + (i + 1) * layerInfo.interval;

                //Create a tile layer option for each timestamp.
                tlOptions.push(createTileLayer(tilesetId, time));

                //Optionally, create a message to display for each frame of the animation based on the time stamp.
                if (time === now) {
                    displayMessages.push('Current');
                } else {
                    var dt = (time - now) / 1000 / 60;
                    displayMessages.push(`${dt} minutes`);
                }
            }

            if (layer) {
                layer.setOptions({
                    tileLayerOptions: tlOptions
                });
                layer.play();
            } else {
                //Create the animation manager.
                layer = new atlas.layer.AnimatedTileLayer({
                    tileLayerOptions: tlOptions,
                    duration: numTimestamps * 800, //Allow one second for each frame (tile layer) in the animation.
                    autoPlay: true,
                    loop: true
                });

                //Add an event to the underlying frame animation to update the message panel when the frame changes.
                map.events.add('onframe', layer.getPlayableAnimation(), function (e) {
                    if (e.frameIdx >= 0) {
                        var msg = displayMessages[e.frameIdx];
                        document.getElementById('messagePanel').innerText = msg;
                    }
                });

                //Add the layer to the map.
                map.layers.add(layer, 'labels');

                //Setup an interval timer to shift the layers (remove oldest, add newest) based on the update interval of the tile layer.
                timer = setInterval(intervalHandler(tilesetId), layerInfo.interval);
            }
        }

        function createTileLayer(tilesetId, time) {
            //Create an ISO 8601 timestamp string.
            //JavaScripts format for ISO string includes decimal seconds and the letter "Z" at the end that is not supported. Use slice to remove this.
            var timestamp = new Date(time).toISOString().slice(0, 19);

            //Create a tile layer option for each timestamp.
            return {
                tileUrl: urlTemplate.replace('{tilesetId}', tilesetId).replace('{timeStamp}', timestamp),
                tileSize: 256,      //Weather tiles only available in 256 pixel size.
                opacity: 0.9,
                maxSourceZoom: 15   //Weather tiles only available to zoom level 15. If you zoom in closer, the map may pull tiles from level 15 to fill the map.
            };
        }

        function intervalHandler(tilesetId) {
            return function () {
                //Get the details for the requested weather layer.
                var layerInfo = weatherLayers[tilesetId];

                //Calculate time period for an animation frame. Shift the interval by one as the olds tile will expire almost immediately.
                var time = (now - layerInfo.past) + (i + 1) * layerInfo.interval;

                //Create an ISO 8601 timestamp string.
                //JavaScripts format for ISO string includes decimal seconds and the letter "Z" at the end that is not supported. Use slice to remove this.
                var timestamp = new Date(time).toISOString().slice(0, 19);

                //Get the current tile layer options from the animation layer.
                var layers = layer.getOptions().tileLayerOptions;

                //Remove the oldest tile layer options.
                tlOptions.shift();

                //Add the newest tile layer options.
                tlOptions.push(createTileLayer(tilesetId, time));

                //Update the animation layer.
                layer.setOptions({ tileLayerOptions: tlOptions });
            }
        }

        export function updateTileLayer(elm) {
            var tilesetId = elm.options[elm.selectedIndex].value;
            loadWeatherLayer(tilesetId);
        }

        function setSpeed(elm) {
            var speed = parseFloat(elm.options[elm.selectedIndex].value);

            layer.setOptions({ speedMultiplier: speed });
        }