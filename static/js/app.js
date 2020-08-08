// Monthly Delays Bar
d3.json('/api/data/monthly_delays').then(data => {
/*
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)
        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}
*/
  // SET THE FILTER HERE
  data = data.filter(d => d.airline_name == 'Delta Air Lines')

  //console.log(data);

  month_name = data.map(d => d.month_name);
  airline_name = data.map(d => d.airline_name);
  average_delay = data.map(d => d.average_delay);

  console.log(month_name);
  console.log(average_delay);

  var trace1 = {
    x: month_name,
    y: average_delay,
    mode: 'lines+markers',
    connectgaps: true
  };
  
  var layout = {
    title: 'Monthly Delays',
    showlegend: false
  };
  
  data = [trace1];

  Plotly.newPlot('monthly-delays', data, layout);  
});


// Airline Cancellations
d3.json('/api/data/airline_cancellations').then(data => {

  data = data.filter(d => d.cancellations > 0);
  
  //ILANA or Joy: set filter here -- use an event listener
  data = data.filter(d => d.month == 'January');

  data.sort((a, b) => b.cancellations - a.cancellations);
  
  data = data.slice(0,10);

  month = data.map(d => d.month);
  airline_name = data.map(d => d.airline_name);
  flights = data.map(d => d.flights);
  cancellations = data.map(d => d.cancellations);
  pct_cancelled = data.map(d => d.cancellations/d.flights);

  var data = [{
    type: 'bar',
    x: cancellations,
    y: airline_name,
    text: cancellations.map(String),
    //orientation: 'h'
  }];
  
  var layout = {
  title: 'Airline Cancellations',
  //barmode: 'stack'
  };

  Plotly.newPlot('airline_cancellations', data, layout);

});


// Airport Cancellations
d3.json('/api/data/airport_cancellations').then(data => {

  data = data.filter(d => d.cancellations > 0);
  
  //ILANA or Joy: set filter here -- use an event listener
  data = data.filter(d => d.month == 'January');

  data.sort((a, b) => b.cancellations - a.cancellations);
  
  console.log('after reverse')
  console.log(data);

  data = data.slice(0,10);

  month = data.map(d => d.month);
  airport_name = data.map(d => d.departure_airport);
  flights = data.map(d => d.flights);
  cancellations = data.map(d => d.cancellations);
  pct_cancelled = data.map(d => d.cancellations/d.flights);

  var data = [{
    type: 'bar',
    x: cancellations,
    y: airport_name,
    text: cancellations.map(String),
    //orientation: 'h'
    marker: {
    color: 'rgb(135, 206, 235)'
    }
  }];
  
  var layout = {
  title: 'Airport Cancellations',
  //barmode: 'stack'
  };

  Plotly.newPlot('airport_cancellations', data, layout);

});
