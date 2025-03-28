import Graphs_Daire from '../graphs/Graphs_Daire';
import LineGraph from '../graphs/LineGraph';
import BarChart from '../graphs/BarChart';
import { useState,useEffect } from 'react';
import { fetchData } from '../services/dataService';
import ScatterEffect from '../graphs/ScatterEffect';
import Barometer from '../graphs/Barometer';
import Temperature from '../graphs/Temperature';
import GaugeBasic from '../graphs/GaugeBasic';
import Histogram from '../graphs/Histogram';
function Graphs() {

    const [data,setData] = useState();

    useEffect(() => {
        const data = fetchData();
        console.log(data[0].animal_number_1hour, "data");
        setData(data[0]);
    }, []);



    return (
        <div className="mt-[50px] container mx-auto px-8 py-12">
            {/* İlk sıra */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 rounded-lg shadow-lg">
                    <LineGraph 
                        subtext="Estimate by 1,5,10 hours" 
                        title="Population Estimation by Hour" 
                        element1={data?.population_number_1hour} 
                        element2={data?.population_number_5hour} 
                        element3={data?.population_number_10hour}
                    />
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <BarChart 
                        type="animal" 
                        element1h={data?.animal_number_1hour} 
                        element5h={data?.animal_number_5hour} 
                        element10h={data?.animal_number_10hour}
                        text="Animal Number"
                    />
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <LineGraph 
                        title="Area Estimation by Hour" 
                        subtext="Estimate by 1,5,10 hours" 
                        element1={data?.est_area_1hour} 
                        element2={data?.est_area_5hour} 
                        element3={data?.est_area_10hour}
                    />
                </div>
            </div>

            {/* İkinci sıra */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 rounded-lg shadow-lg">
                    <BarChart 
                        type="inventory" 
                        element1h={data?.est_inventory_1hour} 
                        element5h={data?.est_inventory_5hour} 
                        element10h={data?.est_inventory_10hour}
                        text="Inventory Number"
                    />
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <ScatterEffect 
                        elements1h={data?.water_sources_1hour} 
                        elements5h={data?.water_sources_5hour} 
                        elements10h={data?.water_sources_10hour} 
                        text="Water Sources" 
                        subtext="1h, 5h, 10h" 
                        type="water"
                    />
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <ScatterEffect 
                        elements1h={data?.outpost_sources_1hour} 
                        elements5h={data?.outpost_sources_5hour} 
                        elements10h={data?.outpost_sources_10hour} 
                        text="Outposts Sources" 
                        subtext="1h, 5h, 10h" 
                        type="outpost" 
                    />
                </div>
            </div>

            {/* Üçüncü sıra */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 rounded-lg shadow-lg">
                    <Barometer value={data?.pressure}/>
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <Temperature 
                        value={data?.temp - 273.15} 
                        min={-40} 
                        max={50} 
                        name="Temperature (°C)" 
                        splitNumber={9}
                        text="Temperature"
                    />
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <Temperature 
                        value={data?.rh} 
                        min={0} 
                        max={100} 
                        name="Humidity (%)" 
                        splitNumber={10}    
                        text="Humidity"
                    />
                </div>
            </div>

            {/* Dördüncü sıra */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg shadow-lg">
                    <GaugeBasic data={[data?.wind_u,data?.wind_v]}/>
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <Histogram data={data?.water_sources_10hour}/>
                </div>
                <div className="p-6 rounded-lg shadow-lg">
                    <Histogram data={data?.outpost_sources_10hour} type="outpost"/>
                </div>
            </div>
        </div>
    );
}   

export default Graphs;
