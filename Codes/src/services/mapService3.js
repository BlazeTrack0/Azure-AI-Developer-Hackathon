import * as atlas from 'azure-maps-control';
import { ArcLayer } from '@deck.gl/layers';
import { MapboxOverlay } from '@deck.gl/mapbox';
// import newData from '../commons/newData.json';
import { fetchData } from './dataService';
import axios from 'axios';

var map, datasource;

        

        export const initializeMap = (mapRef) => {
            // Initialize a map instance.
            map = new atlas.Map(mapRef.current, {
                center: [-97, 39],  // Set the initial center of the map
                zoom: 3,
                style: 'grayscale_dark',
                view: 'Auto',

                // Add authentication details for connecting to Azure Maps.
                authOptions: {
                    // Use Microsoft Entra ID authentication. 
                    authType: 'subscriptionKey',
                    subscriptionKey: AZURE_MAP_KEY, // Your Azure Maps API Key here.
                }
            });

    
            // Wait until the map resources are ready.
            map.events.add('ready', function () {

                // Create a data source and add it to the map.
                datasource = new atlas.source.DataSource(null, {
                    cluster: true, // Enable clustering
                    clusterRadius: 15 // The radius in pixels to cluster points together
                });
                map.sources.add(datasource);

                // Create a heatmap and add it to the map.
                map.layers.add(new atlas.layer.HeatMapLayer(datasource, null, {
                    weight: ['get', 'point_count'],  // Set the weight to the point_count property of the data points.
                    radius: 20  // Optionally adjust the radius of each heat point.
                }), 'labels');

                let coordinateList = []

                // fetch('../commons/data.json')
                // .then(response => response.json())
                // .then(targetArray => {
                //   console.log(targetArray)
                //   coordinateList = targetArray.map(target => ({
                //         latitude: target.latitude,
                //         longitude: target.longitude
                //     }));

                let newData = [];
                    
                axios.get('https://azure-backend-116334440043.us-central1.run.app/live-fire/nasa')
                .then(response => {
                    console.log(response.data, "response.data");
                    newData = response.data;
                
                }).then(() => {
                    coordinateList = newData.map(target => ({

                        latitude: target.latitude,
                        longitude: target.longitude
                    }));

                    console.log(coordinateList, "coordinate list");  


                    let data_coordinates = []

                    coordinateList.map((coordinate) => {
                        
                        data_coordinates.push([coordinate.longitude, coordinate.latitude])
                    })
 
                // Convert the data into GeoJSON format and add it to the data source.
                var geojson = {
                    type: 'FeatureCollection',
                    features: data_coordinates.map(function(coord) {
                        return {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: coord
                            },
                            properties: {
                                point_count: 1 // Adjust based on your data
                            }
                        };
                    })
                };

                // Add the GeoJSON data to the data source.
                datasource.add(geojson);

                });

                })

                return map;



                    
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
                    position: 'bottom-left',
                }
            );
        
            map.controls.add(new atlas.control.StyleControl({
                mapStyles: ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
                layout: 'list'
            }), {
                position: 'bottom-left'
            });
        } 