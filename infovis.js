//You can add as many x3d visualizations as you'd like. Just add to the below object (mapNamesToTriplets)
//in the same format.
//Names can be formatted as such: from the vocabulary of names of properties RIDGE, NUB, CRACK, WEIGHT, DENSITY
//NAME1NAME2NAME3 represent XYZ respectively.
const mapNamesToTriplets = {
  RIDGENUBCRACK: ["RIDGE", "NUB", "CRACK"],
  RIDGENUBWEIGHT: ["RIDGE", "NUB", "WEIGHT"],
  RIDGEWEIGHTDENSITY: ["RIDGE", "WEIGHT", "DENSITY"]
  // RIDGENUBDENSITY: ["RIDGE", "NUB", "DENSITY"]
};
let drawPlot = (d, valueNames) => {
  let val1 = mapNamesToTriplets[valueNames][0];
  let val2 = mapNamesToTriplets[valueNames][1];
  let val3 = mapNamesToTriplets[valueNames][2];

  let chartHolder = d3
    .select("#fillerBody")
    .append("div")
    .attr("id", valueNames);
  d3.select("#" + valueNames)
    .append("h4")
    .text(
      val1 + ", " + val2 + ", " + val3 + " Plotted on X, Y, Z Respectively"
    );
  let myChart = d3.x3d.chart
    .scatterPlot()
    .width(700)
    .height(700);

  let data = {};
  data.key = valueNames;
  data.values = [];

  for (var i = 0; i < d.length; i++) {
    data.values.push({
      key: d[i].OBSERVATION_NUMBER,
      value: d[i][mapNamesToTriplets[valueNames[2]]],
      x: d[i][val1],
      y: d[i][val2],
      z: d[i][val3]
    });
  }

  chartHolder.datum(data).call(myChart);
  x3dom.reload();
};

d3.csv("./pollen.csv").then(d => {
  for (var prop in mapNamesToTriplets) {
    drawPlot(d, prop);
  }
});
