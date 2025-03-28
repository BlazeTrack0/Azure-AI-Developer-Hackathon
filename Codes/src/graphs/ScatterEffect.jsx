import ReactECharts from 'echarts-for-react';
function ScatterEffect({elements1h,elements5h,elements10h,text,subtext,type,fireCoordinate}) {

   let data1h, data5h, data10h;



  if(type === "water"){
    data1h = elements1h?.map((element) => {
        return [element[1], element[2]]
    })

    data5h = elements5h?.map((element) => {
        return [element[1], element[2]]
    })

    data10h = elements10h?.map((element) => {
        return [element[1], element[2]]
    })
    }
    else if(type === "outpost"){
      data1h = elements1h?.map((element) => {
        return [element[2], element[3]]
    })

    data5h = elements5h?.map((element) => {
        return [element[2], element[3]]
    })

    data10h = elements10h?.map((element) => {
        return [element[2], element[3]]
    })
    }

     const option = {
        title: {
            text: text,
            subtext: subtext,
            left: 'center'
        },
        xAxis: {
          scale: true
        },
        yAxis: {
          scale: true
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 30,
            color: 'green',
            data: data1h
            
          },
          {
            type: 'scatter',
            symbolSize: 20,
            color: 'blue',
            data: data5h
          },
          {
            type: 'scatter',
            symbolSize: 10,
            color: 'red',
            data: data10h
          },
          {
            type: 'scatter',
            symbolSize: 40,
            color: 'black',
            data: fireCoordinate
          }
        ]
      };


    return (    
        <div>
            <ReactECharts option={option} />
        </div>
    );
}


export default ScatterEffect;