import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ChartSample() {
  const [dataSample, setDataSample] = useState({
          
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
          horizontal: true,
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
      }
    },
}
  );

  return (
    <div>
      <Chart
        options={dataSample.options}
        series={dataSample.series}
        type="bar"
        width="700"
        height="500"
      />
    </div>
  );
}