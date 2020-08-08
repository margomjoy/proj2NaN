// SRI: Add this to app.js
// Airline Cancellations  
d3.json('/api/data/monthly_cancellations').then(data => {

  month = data.map(d => d.month);
  cancellations = data.map(d => d.cancellations);

  am4core.useTheme(am4themes_animated);
  var chart = am4core.create("radialdiv", am4charts.RadarChart);
  chart.scrollbarX = new am4core.Scrollbar();

  for(var i = 0; i < cancellations.length; i++){
    data.push({category: month[i], value: cancellations[i]});
  }

    chart.data = data;
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(50);
    
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.tooltip.disabled = true;
  categoryAxis.renderer.minHeight = 110;
  categoryAxis.renderer.grid.template.disabled = true;

  let labelTemplate = categoryAxis.renderer.labels.template;
  labelTemplate.radius = am4core.percent(-80);
  labelTemplate.location = 0.5;
  labelTemplate.relativeRotation = 30;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.grid.template.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;
  valueAxis.tooltip.disabled = true;

  var series = chart.series.push(new am4charts.RadarColumnSeries());
  series.sequencedInterpolation = true;
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "category";
  series.columns.template.strokeWidth = 0;
  series.tooltipText = "{valueY}";
  series.columns.template.radarColumn.cornerRadius = 10;
  series.columns.template.radarColumn.innerCornerRadius = 0;

  series.tooltip.pointerOrientation = "vertical";

  let hoverState = series.columns.template.radarColumn.states.create("hover");
  hoverState.properties.cornerRadius = 0;
  hoverState.properties.fillOpacity = 1;


  series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
  })

  chart.cursor = new am4charts.RadarCursor();
  chart.cursor.innerRadius = am4core.percent(50);
  chart.cursor.lineY.disabled = true;

}); 
