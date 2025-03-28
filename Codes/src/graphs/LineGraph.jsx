import ReactECharts from 'echarts-for-react';


function LineGraph({element1,element2,element3,title,subtext}) {

    console.log(element1,element2,element3, "element1,element2,element3")

    const option = {
      title: {
        text: title,
        subtext: subtext,
        left: 'center'
      },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1h', '5h', '10h']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [parseInt(element1), parseInt(element2), parseInt(element3)],
            type: 'line',
            areaStyle: {}
          }
        ]
      };

    return (
        <div>
            <ReactECharts option={option} />
        </div>
    );
}

export default LineGraph;
