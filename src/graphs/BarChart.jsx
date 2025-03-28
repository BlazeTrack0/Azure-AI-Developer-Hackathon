import ReactECharts from 'echarts-for-react';

function BarChart({type, element1h, element5h, element10h,text}) {


  console.log(element1h, "element1h", element5h, "element5h", element10h, "element10h");

  let source = [];

    if(type === "inventory"){
      source = [
        ['product', '1h', '5h', '10h'],
        ['Total People', parseInt(element1h?.total_people), parseInt(element5h?.total_people), parseInt(element10h?.total_people)],
        ['Engine', parseInt(element1h?.engine), parseInt(element5h?.engine), parseInt(element10h?.engine)],
        ['Helicopter', parseInt(element1h?.helicopter), parseInt(element5h?.helicopter), parseInt(element10h?.helicopter)],
        ['Backing Engine', parseInt(element1h?.backing_engine), parseInt(element5h?.backing_engine), parseInt(element10h?.backing_engine)]
      ]
    } else if (type === "animal"){

      source = [
        ['product', '1h', '5h', '10h'],
        ['Cow', parseInt(element1h?.cow_number), parseInt(element5h?.cow_number), parseInt(element10h?.cow_number)],
        ['Sheep', parseInt(element1h?.sheep_number), parseInt(element5h?.sheep_number), parseInt(element10h?.sheep_number)],
        ['Chicken', parseInt(element1h?.chicken_number), parseInt(element5h?.chicken_number), parseInt(element10h?.chicken_number)]
    ]

    }

    


    const option = {

        title: {
            text:text,
            left: 'center',
            top: '90%',
            textStyle: {
                fontSize: 20
            }
        },
        legend: {textStyle: {color: 'black'}},
        tooltip: {textStyle: {color: 'black'}}, 
        dataset: {
          source: source
        },
        xAxis: [
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          { type: 'bar', seriesLayoutBy: 'row' },
          { type: 'bar', seriesLayoutBy: 'row' },
          { type: 'bar', seriesLayoutBy: 'row' },
          // These series are in the second grid.
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
        ]
      };
    return (
        <div>
            <ReactECharts option={option} />
        </div>
    );
}

export default BarChart;
