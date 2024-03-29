import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
export default function ChartSample(props) {
  const dataSample= {
          
    series: [{
      data: [8, 2, 4, 1, 9, 3, 2, 6, 1, 9]
    }],
    options: {
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        }
      },
      colors:['#F44336', '#E91E63', '#9C27B0'],
      dataLabels: {
        enabled: false,
        colors: ["#000","#000","#000"]
      },
      fill: {
        colors: ['#000', '#000', '#000']
      },
      xaxis: {
        categories: ["Relevance", 'Detail', 'Credibility', 'Clarity', 'Organization', 'Objectivity', 'Sources',
          'Timeliness', 'Language Accessibility', 'Impact'
        ],
      },
      yaxis:{
        max:10,
      },
      tooltip: {
        custom: function({ series, seriesIndex, dataPointIndex, w }) {
          return (
             
            '<div class="labelBox">' +'<div class="tooltipBox">'+
            w.globals.labels[dataPointIndex] +
            ": " +
            props.data2[dataPointIndex] +
            
            "</div>"+"</div>"
          );
        }
      }
    },
}
  dataSample.series[0].data = props.data;

  return (
      <Chart
        options={dataSample.options}
        series={dataSample.series}
        
        type="bar"
        width="150%"
        height="60%"
      />
  );
}