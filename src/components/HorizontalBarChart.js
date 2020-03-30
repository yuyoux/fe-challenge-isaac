import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const HorizontalBarChart = (item, selectedProductRevenue) => {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [color, setColor] = useState([]);
  const [code, setCode] = useState([]);

  //TODO: chart js cannot set color/font size for specific labels

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
    setCode([]);
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
      let newcode = ["", ""];
      let enindex =
        item.item.cannibalised.addedProductRevenue -
        item.item.cannibalised.replacedProductRevenue;
      for (const i of item.item.cannibalised.products) {
        let newval = enindex + i.revenue;
        newlabels.push(i.name);
        newdata.push([newval, enindex]);
        newcolor.push("#e5664a");
        newcode.push(i.code);
        enindex = newval;
      }
      newlabels.push("- Net Gain");
      newcode.push("");
      newdata.push(
        (
          item.item.cannibalised.addedProductRevenue -
          item.item.cannibalised.replacedProductRevenue +
          item.item.cannibalised.products.reduce((a, b) => a + b.revenue, 0)
        ).toFixed(2)
      );
      newcolor.push("#3c90f7");
      setData(newdata);
      setLabel(newlabels);
      setColor(newcolor);
      setCode(newcode);
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
    <div
      className={
        label.length <= 4 ? "chart__wrapper" : "chart__wrapper--updated"
      }
    >
      {item && item.item.cannibalised ? (
        <HorizontalBar
          data={chartData}
          options={{
            onClick: function(evt, it) {
              var yLabel = this.scales["y-axis-0"].getValueForPixel(
                evt.offsetY
              );
              console.log(evt);
              if (chartData.labels[yLabel] === "+ Net Gain" && yLabel === 3) {
                updateData(true);
              } else if (
                chartData.labels[yLabel] === "- Net Gain" &&
                yLabel !== 3
              )
                updateData(false);
            },
            responsive: true,
            plugins: {
              datalabels: {
                color: "white",
                anchor: "end",
                align: "start",
                formatter: function(value, context) {
                  if (label[context.dataIndex] === "Added Product") {
                    let num = (value[1] - value[0]).toFixed(2);
                    if (num < 0) {
                      num = num.toString().substr(1);
                    }
                    return "$" + num;
                  } else if (
                    label[context.dataIndex] === "Replaced Product(s)" ||
                    label[context.dataIndex] === "Cannibalised Product(s)"
                  ) {
                    let num = (value[1] - value[0]).toFixed(2);
                    if (num < 0) {
                      num = num.toString().substr(1);
                    }
                    return "-$" + num;
                  } else if (
                    label[context.dataIndex] === "+ Net Gain" ||
                    label[context.dataIndex] === "- Net Gain"
                  ) {
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
              enabled: true,
              callbacks: {
                title: function(tooltipItem, data) {
                  return data["labels"][tooltipItem[0]["index"]].replace(
                    /(\+|-)/gi,
                    ""
                  );
                },
                label: function(tooltipItem, data) {
                  if (
                    data.datasets[0].data[tooltipItem.index].length === 2 &&
                    tooltipItem.index !== 0
                  ) {
                    return (
                      "-$" +
                      (
                        data.datasets[0].data[tooltipItem.index][1] -
                        data.datasets[0].data[tooltipItem.index][0]
                      ).toFixed(2)
                    );
                  } else if (
                    data.datasets[0].data[tooltipItem.index].length === 2 &&
                    tooltipItem.index === 0
                  ) {
                    return (
                      "$" +
                      (
                        data.datasets[0].data[tooltipItem.index][1] -
                        data.datasets[0].data[tooltipItem.index][0]
                      ).toFixed(2)
                    );
                  } else {
                    return "$" + data.datasets[0].data[tooltipItem.index];
                  }
                },
                beforeLabel: function(tooltipItem, data) {
                  if (code[tooltipItem.index] === undefined) {
                    return "";
                  } else {
                    return code[tooltipItem.index];
                  }
                }
              },
              backgroundColor: "white",
              titleFontSize: 16,
              titleFontColor: "black",
              bodyFontColor: "#e5664a",
              bodyFontSize: 16,
              displayColors: false,
              borderColor: "#babcbf",
              borderWidth: 1
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
                    fontSize: 18,
                    fontColor: "#babcbf",
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
