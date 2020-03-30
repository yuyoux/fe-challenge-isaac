import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const HorizontalBarChart = (item, selectedProductRevenue) => {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [color, setColor] = useState([]);

  const setInit = item => {
    setLabel([
      "Added Product",
      "Replaced Product(s)",
      "Cannibalised Product(s)",
      "+ Net Gain"
    ]);
    setColor(["#94c945", "#e5664a", "#e5664a", "#3c90f7"]);
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
  };

  useEffect(() => {
    console.log(item.item.cannibalised);
    if (item.item) {
      setInit(item);
    }
  }, [item, selectedProductRevenue]);

  const updateData = updateFlag => {
    if (item.item && updateFlag) {
      let newdata = [
        [0, item.item.cannibalised.addedProductRevenue],
        [
          item.item.cannibalised.addedProductRevenue -
            item.item.cannibalised.replacedProductRevenue,
          item.item.cannibalised.addedProductRevenue
        ]
      ];
      let newlabels = ["Added Product", "Replaced Product(s)"];
      let newcolor = ["#94c945", "#e5664a"];
      let enindex =
        item.item.cannibalised.addedProductRevenue -
        item.item.cannibalised.replacedProductRevenue;
      for (const i of item.item.cannibalised.products) {
        let newval = enindex + i.revenue;
        newlabels.push(i.name);
        newdata.push([newval, enindex]);
        newcolor.push("#e5664a");
        enindex = newval;
      }
      newlabels.push("+ Net Gain");
      newdata.push(
        (
          item.item.cannibalised.addedProductRevenue -
          item.item.cannibalised.replacedProductRevenue +
          item.item.cannibalised.products.reduce((a, b) => a + b.revenue, 0)
        ).toFixed(2)
      );
      newcolor.push("#94c945");
      setData(newdata);
      setLabel(newlabels);
      setColor(newcolor);
    } else {
      setInit(item);
    }
  };

  const chartData = {
    labels: label,
    datasets: [
      {
        backgroundColor: color,
        hoverBackgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        hoverBorderColor: color,
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
            onClick: function(evt, it) {
              var yLabel = this.scales["y-axis-0"].getValueForPixel(
                evt.offsetY
              );
              console.log(evt);
              if (chartData.labels[yLabel] === "+ Net Gain" && yLabel === 3) {
                updateData(true);
              } else if (
                chartData.labels[yLabel] === "+ Net Gain" &&
                yLabel !== 3
              )
                updateData(false);
            },
            plugins: {
              datalabels: {
                color: "white",
                anchor: "end",
                align: "start",
                formatter: function(value, context) {
                  if (
                    label[context.dataIndex] === "Added Product" ||
                    label[context.dataIndex] === "Replaced Product(s)" ||
                    label[context.dataIndex] === "Cannibalised Product(s)"
                  ) {
                    let num = (value[1] - value[0]).toFixed(2);
                    if (num < 0) {
                      num = num.toString().substr(1);
                    }
                    return "$" + num;
                  } else if (label[context.dataIndex] === "+ Net Gain") {
                    let num = value;
                    if (num < 0) {
                      num = num.toString().substr(1);
                    }
                    return "$" + num;
                  } else {
                    return "";
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
