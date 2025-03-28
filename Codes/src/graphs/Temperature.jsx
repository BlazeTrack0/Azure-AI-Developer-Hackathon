import ReactECharts from 'echarts-for-react';


function Temperature({value,min,max,name,splitNumber,text}){
    
    const option = {

      title: {
        text: text,
        left: 'center',
        top: '0%',
        textStyle: {
            fontSize: 20
        }
      },

        series: [
          {
            type: 'gauge',
            center: ['50%', '70%'],
            startAngle: 200,
            endAngle: -20,
            min: min,
            max: max,
            splitNumber: splitNumber,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 35,
              fontWeight: 'bolder',
              formatter: '{value}',
              color: 'inherit'
            },
            data: [
              {
                value: value?.toFixed(2),
                name: name
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '70%'],
            startAngle: 200,
            endAngle: -20,
            min: min,
            max: max,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: value?.toFixed(2),
                name: name
              }
            ]
          }
        ]
      };

    
    
    return(
        <div>
            <ReactECharts option={option} />
        </div>
    )
}

export default Temperature;
