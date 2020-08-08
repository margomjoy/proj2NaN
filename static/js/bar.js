

status_jan=[]
tot_jan=[]
tot_feb=[]
tot_mar=[]
tot_apr=[]
tot_may=[]
tot_jun=[]
tot_jul=[]
dict=[]
d3.json('jan_json').then(data => {
 console.log(data)
    data.forEach(d => {
     var f_status=d.flight_status;
     var totJan=d.jan_total;
     var totFeb=d.feb_total;
     var totMar=d.mar_total;
     var totApr=d.apr_total;
     var totMay=d.may_total;
     var totJun=d.jun_total;
     var totJuly=d.july_total;
     
     status_jan.push(f_status);
     tot_jan.push(totJan);
     tot_feb.push(totFeb);
     tot_mar.push(totMar);
     tot_apr.push(totApr);
     tot_jun.push(totJun);
     tot_jul.push(totJuly);
     tot_may.push(totMay);
     
     
    });
 
    am4core.useTheme(am4themes_animated);
    // Themes end
        
    var chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2;
    
    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    
    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;
    
    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    
    function createSeries(value, name) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name
    
        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);
    
        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = true
        bullet.dy = -10;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#ffffff')
    
        return series;
    }
    
    chart.data = [
        {
            category: 'January-01',
            first: tot_jan[0],
            second: tot_jan[1],
            third: tot_jan[2],
            fourth: tot_jan[3],
            fifth: tot_jan[4]
        },
        {
            category: 'February-01',
            first: tot_feb[0],
            second: tot_feb[1],
            third: tot_feb[2],
            fourth: tot_feb[3],
            fifth: tot_feb[4]
        },
        {
            category: 'March-01',
            first: tot_mar[0],
            second: tot_mar[1],
            third: tot_mar[2],
            fourth: tot_mar[3],
            fifth: tot_mar[4]
        },
        {
            category: 'April-01',
            first: tot_apr[0],
            second: tot_apr[1],
            third: tot_apr[2],
            fourth: tot_apr[3],
            fifth: tot_apr[4]
        },
        {
            category: 'May-01',
            first: tot_may[0],
            second: tot_may[1],
            third: tot_may[2],
            fourth: tot_may[3],
            fifth: tot_may[4]
        },
        {
            category: 'June-01',
            first: tot_jun[0],
            second: tot_jun[1],
            third: tot_jun[2],
            fourth: tot_jun[3],
            fifth: tot_jun[4]
        },
        {
            category: 'July-01',
            first: tot_jul[0],
            second: tot_jul[1],
            third: tot_jul[2],
            fourth: tot_jul[3],
            fifth: tot_jul[4]
        }
    ]
    
    
    createSeries('first', 'Landed');
    createSeries('second', 'Active');
    createSeries('third', 'Diverted');
    createSeries('fourth', 'Scheduled');
    createSeries('fifth', 'Cancelled');
    
    function arrangeColumns() {
    
        var series = chart.series.getIndex(0);
    
        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;
    
                var newIndex = 0;
                chart.series.each(function(series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;
    
                chart.series.each(function(series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;
    
                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta
    
                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
});


