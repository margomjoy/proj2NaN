// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("capacitydiv", am4charts.XYChart);

// Title
var title = chart.titles.push(new am4core.Label());
title.text = "Change in Global Scheduled Flights Compared to Previous Year (2020 vs. 2019)";
title.fontSize = 25;
title.marginBottom = 15;

// Add data
chart.data = [{
  "category": "Spain",
  "negative1": -3.7,
  "negative2": -94.1,
}, {
  "category": "Hong Kong",
  "negative1": -10.1,
  "negative2": -93.4,
}, {
  "category": "Germany",
  "negative1": -8.5,
  "negative2": -92.9,
}, {
  "category": "Singapore",
  "negative1": 0,
  "negative2": -93.5,

}, {
  "category": "Italy",
  "negative1": -3.2,
  "negative2": -85.6,

}, {
  "category": "France",
  "negative1": -0.8,
  "negative2": -90.9,
}, {
  "category": "UK",
  "negative1": -3.7,
  "negative2": -92.6,
}, {
  "category": "Australia",
  "negative1": -2.0,
  "negative2": -84.8,
}, 
              {
  "category": "Sweden",
  "negative1": -9.0,
  "negative2": -87.9,
},
              {
  "category": "UAE",
  "negative1": -2.0,
  "negative2": -80.6,
}, 
              {
  "category": "South Korea",
  "negative1": 0,
  "negative2": -56.4,
},
              {
  "category": "USA",
  "negative1": 0,
  "negative2": -57.8,
},
              {
  "category": "India",
  "negative1": 0,
  "negative2": -82.3,

},
     {
  "category": "China",
  "negative1": 0,
  "negative2": -42.3,
              },{
  "category": "Japan",
  "negative1": 0,
  "negative2": -39.4,

}];


// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.axisFills.template.disabled = false;
categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = -100;
valueAxis.renderer.minGridDistance = 50;
valueAxis.renderer.ticks.template.length = 5;
valueAxis.renderer.ticks.template.disabled = false;
valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text + "%";
})

// Legend
chart.legend = new am4charts.Legend();
chart.legend.position = "right";

// Use only absolute numbers
chart.numberFormatter.numberFormat = "#.#s";

// Create series
function createSeries(field, name, color) {
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "category";
  series.stacked = true;
  series.name = name;
  series.stroke = color;
  series.fill = color;
  
  var label = series.bullets.push(new am4charts.LabelBullet);
  label.label.text = "{valueX}%";
  label.label.fill = am4core.color("#fff");
  label.label.strokeWidth = 0;
  label.label.truncate = false;
  label.label.hideOversized = true;
  label.locationX = 0.5;
  return series;
}

var interfaceColors = new am4core.InterfaceColorSet();
var positiveColor = interfaceColors.getFor("positive");
var negativeColor = interfaceColors.getFor("negative");

createSeries("negative2", "April", negativeColor.lighten(0.5));
createSeries("negative1", "January", negativeColor);

chart.legend.events.on("layoutvalidated", function(event){
  chart.legend.itemContainers.each((container)=>{
    if(container.dataItem.dataContext.name == "Never"){
      container.toBack();
    }
  })
})