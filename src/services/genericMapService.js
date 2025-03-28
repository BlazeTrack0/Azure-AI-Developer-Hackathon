import * as atlas from 'azure-maps-control';

export const getGenericMap = (mapRef,timeFrame,showWaterSources,showOutpostSources,latitude,longitude,allSources) => {

       allSources = allSources[0];
        
   
        const map =  new atlas.Map(mapRef.current, {
            center: [latitude, longitude],
            zoom: 5,
            pitch: 90,
            style: "grayscale_dark",
            antialias: false,
            authOptions: {
                authType: 'subscriptionKey',
                subscriptionKey: AZURE_MAP_KEY
            }
        });

        


        map.events.add('ready',  async function () {


            console.log(allSources?.nature, "allSources")

          


            if(allSources?.nature === "Eucalyptus" || 
               allSources?.nature === "Cypress" ||
               allSources?.nature === "Cedar" ||
               allSources?.nature === "Juniper" ||
               allSources?.nature === "Fir" ||
               allSources?.nature === "Spruce") {
                
                map.imageSprite.add('igne-1', '/icons/igne-1.png').then(function () {  
                    addFireIcon(map,'igne-1',allSources)
                    console.log("igne-1 added");  
                });
            }
            else if(allSources?.nature === "Larch") {
                map.imageSprite.add('igne-2', '/icons/igne-2.png').then(function () {  
                    addFireIcon(map,'igne-2',allSources)
                    console.log("igne-2 added");  
                });
            }
            else if(allSources?.nature === "Sequoia") {
                map.imageSprite.add('igne-3', '/icons/igne-3.png').then(function () {  
                    addFireIcon(map,'igne-3',allSources)
                    console.log("igne-3 added");  
                });
            }

            else if(allSources?.nature === "Chaparral" || 
                    allSources?.nature === "Palmetto" ||
                    allSources?.nature === "Gorse" ||
                    allSources?.nature === "Heath" ||
                    allSources?.nature === "Manzanita" ||
                    allSources?.nature === "Mesquite" ||
                    allSources?.nature === "Tamarisk") {
                
                map.imageSprite.add('savan-1', '/icons/savan-1.png').then(function () {  
                    addFireIcon(map,'savan-1',allSources)
                    console.log("savan-1 added");  
                });
            }
            else if(allSources?.nature === "Maquis" ||
                    allSources?.nature === "Phrygana") {
                
                map.imageSprite.add('savan-2', '/icons/savan-2.png').then(function () {  
                    addFireIcon(map,'savan-2',allSources)
                    console.log("savan-2 added");  
                });
            }
            else if(allSources?.nature === "Redbud" ||
                    allSources?.nature === "Dogwood") {
                
                map.imageSprite.add('savan-3', '/icons/savan-3.png').then(function () {  
                    addFireIcon(map,'savan-3',allSources)
                    console.log("savan-3 added");  
                });
            }

        
            else if(allSources?.nature === "Oak" || 
                allSources?.nature === "Maple" ||
                allSources?.nature === "Birch" ||
                allSources?.nature === "Poplar" ||
                allSources?.nature === "Chestnut" ||
                allSources?.nature === "Black Locust" ||
                allSources?.nature === "Hickory" ||
                allSources?.nature === "Sweetgum" ||
                allSources?.nature === "Acacia" ||
                allSources?.nature === "Teak" ||
                allSources?.nature === "Kapok" ||
                allSources?.nature === "Brazilian" ||
                allSources?.nature === "Cerrado" ||
                allSources?.nature === "Trees") {
                
                map.imageSprite.add('genis-2', '/icons/genis-2.png').then(function () {  
                    addFireIcon(map,'genis-2',allSources)
                    console.log("genis-2 added");  
                });
            }

            else if(allSources?.nature === "Aspen" ||
                    allSources?.nature === "Baobab") {
                
                map.imageSprite.add('genis-3', '/icons/genis-3.png').then(function () {  
                    addFireIcon(map,'genis-3',allSources)
                    console.log("genis-3 added");  
                });
            }

            else if(allSources?.nature === "Alder" ||
                    allSources?.nature === "Magnolia" ||
                    allSources?.nature === "Sycamore" ||
                    allSources?.nature === "Beech" ||
                    allSources?.nature === "Willow" ||
                    allSources?.nature === "Cottonwood" ||
                    allSources?.nature === "Walnut" ||
                    allSources?.nature === "Mangrove" ||
                    allSources?.nature === "Avocado" ||
                    allSources?.nature === "Sequoia") {
                
                map.imageSprite.add('palmiye-1', '/icons/palmiye-1.png').then(function () {  
                    addFireIcon(map,'palmiye-1',allSources)
                    console.log("palmiye-1 added");  
                });
            }

            else if(allSources?.nature === "Bamboo") {
                map.imageSprite.add('bambu-1', '/icons/bambu-1.png').then(function () {  
                    addFireIcon(map,'bambu-1',allSources)
                    console.log("bambu-1 added");  
                });
            }



        
          let waterSources;
          let outpostSources;

          if(timeFrame == 1){
            waterSources = allSources?.water_sources_1hour;
            outpostSources = allSources?.outpost_sources_1hour;
          } else if (timeFrame == 5){
            waterSources = allSources?.water_sources_5hour;
            outpostSources = allSources?.outpost_sources_5hour;
          } else if (timeFrame == 10){
            waterSources = allSources?.water_sources_10hour;
            outpostSources = allSources?.outpost_sources_10hour;
          }

          if(showWaterSources && waterSources?.length > 0){
            //Load the water sources
            map.imageSprite.add('water-icon', '/icons/water.png').then(function () {
              //Create a data source and add it to the map.
              
              waterSources.forEach(source => {
                addSources(map, source,'water-icon',2,1);
              });

            });
          }

          if(showOutpostSources && outpostSources?.length > 0){
            map.imageSprite.add('outpost-icon', '/icons/outpost.png').then(function () {
            
  
              outpostSources.forEach(source => {
                addSources(map, source,'outpost-icon',3,2);
                console.log("Outpost added");
              });

            });
          }
        
          console.log(map, "map ready - service")
          console.log("Map ready");
          

          })


return map;

};


function addFireIcon(map,icon,allSources){

  var datasource = new atlas.source.DataSource();
      map.sources.add(datasource);

      datasource.add(new atlas.data.Feature(new atlas.data.Point([allSources?.latitude, allSources?.longitude]), {
        temperature: 64
      }));
              
      map.layers.add(new atlas.layer.SymbolLayer(datasource, null, {

        iconOptions: {
        image: icon,
        size: 0.1,     
        }


        }));



}


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
      size: 0.1 ,
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
