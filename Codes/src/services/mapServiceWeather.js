
import * as atlas from 'azure-maps-control';
var map, tileLayer;
var weatherTileUrl = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId={layerName}&zoom={z}&x={x}&y={y}';


export const initializeMap = (mapRef,selectedLayer) => {


    //Initialize a map instance.
    map = new atlas.Map(mapRef.current, {
        center: [-99.47, 40.75],
        zoom: 3,
        view: 'Auto',
        style: 'grayscale_dark',

        //Add authentication details for connecting to Azure Maps.
        authOptions: {
            
            clientId: 'e6b6ab59-eb5d-4d25-aa57-581135b927f0', //Your Azure Maps client id for accessing your Azure Maps account.
            authType: 'subscriptionKey',
            subscriptionKey: AZURE_MAP_KEY
            
        }
    });

    //Wait until the map resources are ready.
    map.events.add('ready', function () {
        //Create a style control and add it to the map.
        map.controls.add(new atlas.control.StyleControl({
            mapStyles: 'all'
        }), {
            position: 'top-right'
        });
        //Initialize the weather tile layer.
        setTimeout(() => {
            console.log("Tile layer güncelleniyor...");
            updateTileLayer(selectedLayer);
        }, 5000);
        
    });

    


    return map;
}



export function updateTileLayer(selectedLayer) {
    var layerName = selectedLayer;
    var tileUrl;

    if(layerName == 'microsoft.weather.radar.main'){
        console.log("Radar layer seçildi");
        tileUrl = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId=microsoft.weather.radar.main&zoom={z}&x={x}&y={y}';
    } else if(layerName == 'microsoft.weather.infrared.main'){
        console.log("Infrared layer seçildi");
        tileUrl = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId=microsoft.weather.infrared.main&zoom={z}&x={x}&y={y}';
    }

    // tileUrl = 'https://{azMapsDomain}/map/tile?api-version=2022-08-01&tilesetId=microsoft.weather.infrared.main&zoom={z}&x={x}&y={y}';

    //var tileUrl = weatherTileUrl.replace('{layerName}', layerName);
  

    if (!tileLayer) {
        //Create a tile layer and add it to the map below the label layer.
        tileLayer = new atlas.layer.TileLayer({
            tileUrl: tileUrl,
            opacity: 0.9,
            tileSize: 256
        });

        map.layers.add(tileLayer, 'labels');

    } else {
        tileLayer.setOptions({
            tileUrl: tileUrl
        }); 
    

    }
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