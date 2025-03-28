import * as atlas from 'azure-maps-control';
import live_data from '../commons/live_data.json';
import axios from 'axios';

export const getGenericMapOutpost = (mapRef,timeFrame,latitude,longitude) => {

      

  const fetchOutpostSources = async (latitude,longitude) => {
    try {
        const response = await axios.post('https://azure-backend-116334440043.us-central1.run.app/live-fire/outpost', {
            latitude: latitude,
            longitude: longitude
        });
        console.log('Outpost kaynakları verisi:', response.data);
        return response.data;
    } catch (error) {
        console.error('Outpost kaynakları verisi alınırken hata oluştu:', error);
        return null;
    }
  };


   
        const map =  new atlas.Map(mapRef.current, {
            center: [live_data[0].longitude, live_data[0].latitude],
            zoom: 5,
            pitch: 90,
            style: "grayscale_dark",
            antialias: false,
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: AZURE_MAP_KEY
            }
        });




    
        map.events.add('ready', async function () {

          const outpostSourcesData = await fetchOutpostSources(latitude,longitude);

          console.log(outpostSourcesData, "outpostSourcesData")

          let outpostSources;

          if(timeFrame == 1){
            outpostSources = outpostSourcesData?.outpost_sources_1hour ||[];
          } else if (timeFrame == 5){
            outpostSources = outpostSourcesData?.outpost_sources_5hour ||[];
          } else if (timeFrame == 10){
            outpostSources = outpostSourcesData?.outpost_sources_10hour ||[];
          }


         

          if(outpostSources.length > 0){
            map.imageSprite.add('outpost-icon', '/icons/outpost.png').then(function () {
              //Create a data source and add it to the map.
              
              outpostSources.forEach(source => {
                addSources(map, source,'outpost-icon',3,2);
              });

            });




          }
        


})


return map;

};


function addSources(map, source,icon,latitude,longitude){
  var datasource = new atlas.source.DataSource();
  map.sources.add(datasource);

  //Create a point feature and add it to the data source.
  datasource.add(new atlas.data.Feature(new atlas.data.Point([source[latitude], source[longitude]]), {
    temperature: 64
  }));

  //Add a layer for rendering point data as symbols.
  map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {
    iconOptions: {
      //Pass in the id of the custom icon that was loaded into the map resources.
      image: icon,
      //Optionally scale the size of the icon.
      size: 0.1,
      rotation:180,
    },
    textOptions: {
      //Convert the temperature property of each feature into a string and concatenate "°F".
      textField: ['concat', ['to-string', ['get', 'temperature']], '°F'],

      //Offset the text so that it appears on top of the icon.
      offset: [0, -2]
    }
  }));
}

export const setMapControls = (map, coordinates) => {

  console.log("Function Log 4")
      
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

  console.log("Function Log 5")

  map.controls.add(new atlas.control.StyleControl({
      mapStyles: ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
      layout: 'list'
  }), {
      position: 'bottom-left'
  });
} 
