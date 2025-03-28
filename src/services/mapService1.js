import * as atlas from 'azure-maps-control';
import { ArcLayer } from '@deck.gl/layers';
import { MapboxOverlay } from '@deck.gl/mapbox';
//import newData from '../commons/newData.json';
import { fetchData } from './dataService';
class DeckGLOverlay {
    constructor(options) {
        this.id = options.id;
        this._mbOverlay = new MapboxOverlay(options);
    }
    onAdd(map) { return this._mbOverlay.onAdd(map["map"]); }
    onRemove() { this._mbOverlay.onRemove(); }
    setProps(props) { this._mbOverlay.setProps(props); }
}

export const getColorBasedOnValue = (value) => {
    if (value > 80) return [255, 0, 0]; // Kırmızı
    if (value > 50) return [255, 140, 0]; // Turuncu
    if (value > 20) return [255, 215, 0]; // Sarı
    return [34, 139, 34]; // Yeşil
}

export const calculateArcs = (_,timeFrame) => {
    
    let allSources = [];

    const newData = fetchData();



    newData.forEach(target => {
        console.log(target, "target");
        const source = [target.latitude, target.longitude];
        
        let waterSources = [];
        if(timeFrame == 1){
             waterSources = target.water_sources_1hour.map(target => ({ source:source, target: [target[1], target[2]], type: "water" }));
        } else if(timeFrame == 5){
            waterSources = target.water_sources_5hour.map(target => ({ source:source, target: [target[1], target[2]], type: "water" }));
        } else if(timeFrame == 10){
            waterSources = target.water_sources_10hour.map(target => ({ source:source, target: [target[1], target[2]], type: "water" }));
        }
        

        let outpostSources = [];
        if(timeFrame == 1){
            outpostSources = target.outpost_sources_1hour.map(target => ({ source:source, target: [target[2], target[3]], type: "outpost" }));
        } else if(timeFrame == 5){
            outpostSources = target.outpost_sources_5hour.map(target => ({ source:source, target: [target[2], target[3]], type: "outpost" }));
        } else if(timeFrame == 10){
            outpostSources = target.outpost_sources_10hour.map(target => ({ source:source, target: [target[2], target[3]], type: "outpost" }));
        }
        
        console.log(waterSources, "waterSources");
        
        allSources.push(...waterSources, ...outpostSources);
   
    });

    allSources.forEach(source => {
        console.log(source, "source");
    });

    return allSources;

    //return coordinates.map(target => {console.log(target, "target"); return ({ source, target: target.coords }) });
    //Target renginin ayarlanması gerekiyor - Su Mavi Outpost Yeşil
}

export const initializeMap = (mapRef) => {
    const map =  new atlas.Map(mapRef.current, {
        center: [-95.0, 40.0],
        zoom: 5,
        pitch: 60,
        style: "grayscale_dark",
        antialias: false,
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: AZURE_MAP_KEY
        }
    });




     return map;



}

export const setMapControls = (map, coordinates,timeFrame) => {
    map.controls.add(new DeckGLOverlay({
        layers: [
            new ArcLayer({
                id: "arc",
                data: calculateArcs(coordinates,timeFrame),
                getSourcePosition: (d) => d.source,
                getTargetPosition: (d) => d.target,
                getSourceColor:  (d) => d.type === "water" ? [0, 0, 255] : [255,0,0],
                getTargetColor: (d) => d.type === "water" ? [0, 0, 255] : [255,0,0],
                getWidth: (d) => 2
            })
        ]
    }));





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