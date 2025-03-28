import ReactECharts from 'echarts-for-react';




function getMaxMinDistance(data){
  let max = 0;
  let min = 0;
  data?.forEach(item => {
      if(item[0] > max){
          max = item[0];
      }
      if(item[0] < min){
          min = item[0];
      }
  });

  console.log(min,max)
  return {max,min};
 }

 function getDistanceRanges(max, min) {
  const interval = (max - min) / 7;
  const ranges = [];
  
  for (let i = 0; i < 7; i++) {
      const start = min + (interval * i);
      const end = min + (interval * (i + 1));
      ranges.push({
          start: start,
          end: end,
          count: 0
      });
  }
  return ranges;
 }

 function getDistanceCount(data){
  const { max, min } = getMaxMinDistance(data);
  const ranges = getDistanceRanges(max, min);
  
  data?.forEach(item => {
      for (let range of ranges) {
          if (item[0] >= range.start && item[0] <= range.end) {
              range.count++;
              break;
          }
      }
  });

  // Histogram için kaynak verisi oluşturma
  const source = ranges.map((range, index) => ({
      range: `${range.start.toFixed(2)}`,
      count: range.count
  }));

  return source;
 }

function Histogram({data,type}){

   console.log(data, "data_incoming")

   if(type == "outpost"){

      data = data?.map((item)=> {
          return [item[1],item[2],item[3]]
      })

      console.log(data,"Data after outpost")


   }




   const histogramData = getDistanceCount(data);

   console.log(histogramData, "histogramData");

   console.log(histogramData.map((item,index) => {console.log(item, "item_map");return item?.range}), "histogram Range")



   const option = {
    xAxis: {
      type: 'category',
      data: histogramData.map((item) => {return item?.range})
    },
    yAxis: { 
      type: 'value',
      data: histogramData.map((item) => {return item?.count})
    },
    series: [
      {
        data: histogramData.map((item) => {return item?.count}),
        type: 'bar'
      }
    ]
  };


    

    return (
      <div>
        <ReactECharts option={option} />
      </div>
    )




}


export default Histogram;
