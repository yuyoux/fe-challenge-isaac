import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const HorizontalBarChart = (item, selectedProductRevenue) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(item.item.cannibalised);
    if (item.item) {
      setData([
        [0, item.item.cannibalised.addedProductRevenue],
        [
          item.item.cannibalised.addedProductRevenue -
            item.item.cannibalised.replacedProductRevenue,
          item.item.cannibalised.addedProductRevenue
        ],

        [
          item.item.cannibalised.addedProductRevenue -
            item.item.cannibalised.replacedProductRevenue +
            item.item.cannibalised.products.reduce((a, b) => a + b.revenue, 0),
          item.item.cannibalised.addedProductRevenue -
            item.item.cannibalised.replacedProductRevenue
        ],
        (
          item.item.cannibalised.addedProductRevenue -
          item.item.cannibalised.replacedProductRevenue +
          item.item.cannibalised.products.reduce((a, b) => a + b.revenue, 0)
        ).toFixed(2)
      ]);
    }
  }, [item, selectedProductRevenue]);

  const chartData = {
    labels: [
      "Added Product",
      "Replaced Product(s)",
      "Cannibalised Product(s)",
      "Net Gain"
    ],
    datasets: [
      {
        backgroundColor: ["#94c945", "#e5664a", "#e5664a", "#3c90f7"],
        hoverBackgroundColor: ["#94c945", "#e5664a", "#e5664a", "#3c90f7"],
        borderColor: ["#94c945", "#e5664a", "#e5664a", "#3c90f7"],
        borderWidth: 1,
        hoverBorderColor: ["#94c945", "#e5664a", "#e5664a", "#3c90f7"],
        data: data
      }
    ]
  };

  return (
    <div className="chart__wrapper">
      {item && item.item.cannibalised ? (
        <HorizontalBar
          data={chartData}
          height="100%"
          options={{
            plugins: {
              datalabels: {
                color: "white",
                anchor: "end",
                align: "start",
                formatter: function(value, context) {
                  if (value.length === 2) {
                    let num = (value[1] - value[0]).toFixed(2);
                    if (num < 0) {
                      num = num.toString().substr(1);
                    }
                    return "$" + num;
                  } else {
                    let num = value;
                    if (num < 0) {
                      num = num.toString().substr(1);
                    }
                    return "$" + num;
                  }
                },

                font: {
                  weight: "bold",
                  fontSize: 24
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              yAxes: [
                {
                  barThickness: 28,

                  display: true,
                  scaleLabel: {
                    display: true
                  },
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    fontColor: "black",
                    fontSize: 18
                  }
                }
              ],
              xAxes: [
                {
                  position: "top",
                  gridLines: {
                    display: true,
                    borderDash: [8, 4],
                    drawBorder: false
                  },
                  scaleLabel: {
                    display: false
                  },
                  ticks: {
                    stepSize: 2
                  }
                }
              ]
            }
          }}
        ></HorizontalBar>
      ) : null}
    </div>
  );
};

export default HorizontalBarChart;
