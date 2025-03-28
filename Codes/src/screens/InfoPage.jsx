import { useEffect,useRef } from "react";
import {initializeMap,setMapControls} from '../services/mapService3D'


function InfoPage() {
    const mapRef = useRef(null);
    
    useEffect(()=> {
    
        const map = initializeMap(mapRef); 
        const coordinates = [];
        setMapControls(map, coordinates);

        console.log("Her şey çalıştı sorun yok mu ?")

        return () => map.dispose();
    },[]) 


    return (
        <div className="w-full h-screen">
            <div ref={mapRef} id="map" className="w-full h-full">
                {/* Harita buraya eklenecek */}
            </div>
        </div>
    )
}


export default InfoPage;
