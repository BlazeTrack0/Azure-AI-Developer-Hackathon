import * as atlas from 'azure-maps-control';
import { ArcLayer } from '@deck.gl/layers';
import { MapboxOverlay } from '@deck.gl/mapbox';

 

        var map;

        // Radar tile layer URL template
        var urlTemplate = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId=microsoft.weather.radar.main&zoom={z}&x={x}&y={y}&timeStamp={timeStamp}&tileSize=256&view=Auto';

        export const initializeMap = (mapRef) => {
            // Initialize map
            map = new atlas.Map(mapRef.current, { 
                center: [-95, 40], // Coordinates (longitude, latitude)
                zoom: 3,
                style: 'grayscale_dark',
                authOptions: {
                    authType: 'subscriptionKey',
                    subscriptionKey: 'xl3LpSs7R87GcWtA7lnccGyBmSqP5nMhd9zYwYhyfI2yfmsivzQhJQQJ99BCACYeBjF1ewwQAAAgAZMP2aig' // Replace with your Azure Maps key
                }
            });

            // Wait until the map is ready
            map.events.add('ready', function () {
                loadRadarLayer();
            });

            return map;
        }

        export const loadRadarLayer = () => {
            // Get current time
            var now = new Date().getTime();

            // Create the tile layer for radar
            var tileLayer = new atlas.layer.TileLayer({
                tileUrl: urlTemplate.replace('{timeStamp}', new Date(now).toISOString().slice(0, 19)),
                tileSize: 256,
                opacity: 0.9,
                maxSourceZoom: 15
            });

            // Add the tile layer to the map
            map.layers.add(tileLayer);
        }


        export const setMapControls = (map, coordinates) => {
        
            map.controls.add(
                [
                    new atlas.control.ZoomControl(),
                    new atlas.control.PitchControl(),
                    new atlas.control.FullscreenControl(),
                    new atlas.control.ScaleControl(),
                ],
                {
                    position: 'top-right',
                }
            );
        
            map.controls.add(new atlas.control.StyleControl({
                mapStyles: ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
                layout: 'list'
            }), {
                position: 'top-right'
            });
        } 