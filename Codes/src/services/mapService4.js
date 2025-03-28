import * as atlas from 'azure-maps-control';
//import newData from '../commons/newData.json';
import { fetchData } from './dataService';

const azureMapsKey = AZURE_MAP_KEY;

    async function fetchLocations(timeFrame) {
        try {
            
            
            const newData = await fetchData();
            

            console.log(newData, "Data fetched");

            let locations = [];


            newData.forEach(entry => {
                // Ana yangın noktası (source)
                let source = [
                    isFinite(entry.longitude) ? entry.longitude : 0,
                    isFinite(entry.latitude) ? entry.latitude : 0
                ];

            

                if(timeFrame == 1){
                    entry.water_sources_1hour.forEach(waterSource => {
                        // waterSource formatı: [mesafe, lat, lon]
                        if (waterSource && waterSource.length === 3) {
                            let target = [waterSource[2], waterSource[1]]; // [lon, lat]
                            
                            if (isValidCoordinate(target)) {
                                locations.push({
                                    source,
                                    target,
                                    type: "water"
                                });
                            }
                        }
                    });


                    entry.outpost_sources_1hour.forEach(outpostSource => {
                        // outpostSource formatı: [isim, mesafe, lat, lon]
                        if (outpostSource && outpostSource.length === 4) {
                            let target = [outpostSource[3], outpostSource[2]]; // [lon, lat]
                            
                            if (isValidCoordinate(target)) {
                                locations.push({
                                    source,
                                    target,
                                    type: "outpost"
                                });
                            }
                        }
                    });


                } else if(timeFrame == 5){
                    
                    
                    entry.water_sources_5hour.forEach(waterSource => {
                        // waterSource formatı: [mesafe, lat, lon]
                        if (waterSource && waterSource.length === 3) {
                            let target = [waterSource[2], waterSource[1]]; // [lon, lat]
                            
                            if (isValidCoordinate(target)) {
                                locations.push({
                                    source,
                                    target,
                                    type: "water"
                                });
                            }
                        }
                    });


                    entry.outpost_sources_5hour.forEach(outpostSource => {
                        // outpostSource formatı: [isim, mesafe, lat, lon]
                        if (outpostSource && outpostSource.length === 4) {
                            let target = [outpostSource[3], outpostSource[2]]; // [lon, lat]
                            
                            if (isValidCoordinate(target)) {
                                locations.push({
                                    source,
                                    target,
                                    type: "outpost"
                                });
                            }
                        }
                    });

                } else if(timeFrame == 10){


                    entry.water_sources_10hour.forEach(waterSource => {
                        // waterSource formatı: [mesafe, lat, lon]
                        if (waterSource && waterSource.length === 3) {
                            let target = [waterSource[2], waterSource[1]]; // [lon, lat]
                            
                            if (isValidCoordinate(target)) {
                                locations.push({
                                    source,
                                    target,
                                    type: "water"
                                });
                            }
                        }
                    });


                    entry.outpost_sources_10hour.forEach(outpostSource => {
                        // outpostSource formatı: [isim, mesafe, lat, lon]
                        if (outpostSource && outpostSource.length === 4) {
                            let target = [outpostSource[3], outpostSource[2]]; // [lon, lat]
                            
                            if (isValidCoordinate(target)) {
                                locations.push({
                                    source,
                                    target,
                                    type: "outpost"
                                });
                            }
                        }
                    });

                }

         
                

                // Outpost kaynakları için (1 saatlik olanları kullanalım)
                
            });

            return locations;
        } catch (err) {
            console.error("Error:", err);
            return [];
        }
    }

    // Koordinatların geçerli olup olmadığını kontrol eden yardımcı fonksiyon
    function isValidCoordinate(coord) {
        return Array.isArray(coord) && 
               coord.length === 2 && 
               coord.every(isFinite) && 
               !(coord[0] === 0 && coord[1] === 0);
    }

    export const initializeMap = async (mapRef,timeFrame) => {
        const locations = await fetchLocations(timeFrame);

        if (locations.length === 0) {
            console.error("Konum bilgisi alınamadı.");
            return;
        }

        const firstPoint = locations[0].source; // İlk noktayı haritanın merkezi yapalım.

        const map = new atlas.Map(mapRef.current, {
            center: firstPoint,
            zoom: 5,
            style: "road",
            authOptions: {
                authType: "subscriptionKey",
                subscriptionKey: azureMapsKey
            }
        });

        map.events.add("ready", async function () {
            const datasource = new atlas.source.DataSource();
            map.sources.add(datasource);
            map.layers.add(new atlas.layer.LineLayer(datasource, null, { strokeColor: "blue", strokeWidth: 3 }));

            // Tüm noktaları haritaya ekle
            locations.forEach(({ source, target, type }) => {
                datasource.add([
                    new atlas.data.Feature(new atlas.data.Point(source), { title: "Başlangıç" }),
                    new atlas.data.Feature(new atlas.data.Point(target), { title: "Hedef" })
                ]);
            });

            map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {
                iconOptions: { image: "pin-round-blue" }
            }));

            // Her iki nokta arasında ayrı ayrı rota alalım.
            for (const { source, target, type } of locations) {
                await getRoute(map, datasource, source, target, type);
            }
        });


        return map;
    }

    async function getRoute(map, datasource, startPoint, endPoint, type) {
        try {
            const response = await fetch(`https://atlas.microsoft.com/route/directions/json?subscription-key=${azureMapsKey}&api-version=1.0&query=${startPoint[1]},${startPoint[0]}:${endPoint[1]},${endPoint[0]}`);
            const data = await response.json();

            console.log(data,"Data get Route")

            if (data.routes && data.routes.length > 0) {
                const routeCoordinates = data.routes[0].legs[0].points.map(p => [p.longitude, p.latitude]);

                // Rota çizim rengi
                let routeColor = (type === "outpost") ? "red" : "blue";  // Su kaynakları için mavi, Outpost için kırmızı.

                console.log(routeColor, " => color")
                let newDatasource = new atlas.source.DataSource();
                map.sources.add(newDatasource);

                const routeLine = new atlas.data.LineString(routeCoordinates);
                const routeFeature = new atlas.data.Feature(routeLine);
                
                 
                newDatasource.add(routeFeature);

                
                map.layers.add(new atlas.layer.LineLayer(newDatasource, null, {
                    strokeColor: routeColor, 
                    strokeWidth: 3
                }));
            }
        } catch (error) {
            console.error("Rota alınırken hata oluştu:", error);
        }
    }


export const setMapControls = (map, coordinates) => {

    console.log(map, "map-controls-function")
        
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


   