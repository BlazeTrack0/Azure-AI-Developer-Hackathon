import ReactECharts from 'echarts-for-react';

function GaugeBasic({data}){

    console.log(data, "data");


    function calculateWindDirection(wind_u, wind_v) {

        console.log(wind_u, wind_v, "wind_u, wind_v");
        let angle = Math.atan2(-wind_u, -wind_v) * (180 / Math.PI); // Radyanı dereceye çevir
    
        if (angle < 0) {
            angle += 360; // Negatif açıları pozitif hale getir
        }
        console.log(angle, "angle");
        return angle;
    }


    function calculateWindSpeed(wind_u, wind_v) {
        return Math.sqrt(wind_u * wind_u + wind_v * wind_v);
    }

    const windDirection = calculateWindDirection(parseFloat(data[0]), parseFloat(data[1]));
    const windSpeed = calculateWindSpeed(parseFloat(data[0]), parseFloat(data[1]));
   
    const option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}°'
        },
        title: {
            text: 'Wind Direction',
            left: 'center',
            top: '0%',
            textStyle: {
                fontSize: 20
            }
        },
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                startAngle: 0, // Kuzeyi üstte başlatmak için
                endAngle: -360, // Saat yönünde dönüş için
                min: 0,
                max: 360,
                splitNumber: 8, // 8 bölüme ayır (ana ve ara yönler için)
                axisLabel: {
                    formatter: function(value) {
                        switch(value) {
                            case 0:
                                return 'D';
                            case 45:
                                return 'GD';
                            case 90:
                                return 'G';
                            case 135:
                                return 'GB';
                            case 180:
                                return 'B';
                            case 225:
                                return 'KB';
                            case 270:
                                return 'K';
                            case 315:
                                return 'KD';
                            default:
                                return '';
                        }
                    }
                },
                axisTick: {
                    splitNumber: 5
                },
                pointer: {
                    length: '80%'
                },
                detail: {
                    formatter: '{value}°',
                    fontSize: 16,
                    offsetCenter: [0, '50%']
                },
                data: [
                    {
                        value: windDirection.toFixed(2),
                        name: windSpeed.toFixed(2) + ' m/s'
                    }
                ]
            }
        ]
    };
   
    return(
        <div>
            <ReactECharts option={option} />
        </div>
    );
}


export default GaugeBasic;