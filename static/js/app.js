function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples);

    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that filters the metadata array for the object with the desired sample number.
    var metaArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    
    //  Create a variable that holds the first sample in the array.
    var sampResult = sampleArray[0];
    console.log(sampResult);

    // Create a variable that holds the first sample in the metadata array.
    var metaResult = metaArray[0];
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = sampResult.otu_ids;
    var otuLabels = sampResult.otu_labels;
    var otuValues = sampResult.sample_values;
    
   console.log(otuValues);
   // Create a variable that holds the washing frequency.
    var wfreq =  parseFloat(metaResult.wfreq);
    console.log(wfreq);


    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).reverse().map(row => `OTU ${row}`);
    console.log(yticks);
//     // Create the trace for the bar chart. 
    var trace = {
      x: otuValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      name: "Bacteria",
      type: 'bar',
      marker:{
        color:'darkgreen'
      },
      orientation: 'h'
    };

    var barData = [trace];
  // Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
      plot_bgcolor:"rgb(234, 241, 213)",
      paper_bgcolor:"rgb(234, 241, 213)"
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar",barData,barLayout);

    // Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: otuValues,
      text: otuLabels,   
      mode: 'markers',
      marker:{
        opacity: 0.5,
        size: otuValues, 
        sizeref: .025,
        sizemode: 'area',
        color: otuIds,
        colorscale: 'Earth'
      }
    }];

    // Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
      xaxis: {title: "OTU ID"},
      plot_bgcolor:"rgb(234, 241, 213)",
      paper_bgcolor:"rgb(234, 241, 213)"
    };

    // Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble",bubbleData,bubbleLayout); 

    // Create the trace for the gauge chart.
    var gaugeData = [{
      value: wfreq,
      type: "indicator",
      title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week ",
      mode: "gauge+number",
      gauge:{
        axis: {range: [null,10]},
        bar: {color: "black"},
        steps:[
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "lightgreen"},
          {range: [8,10], color: "green"},
          ],
        }
      } 
    ];
    
    // Create the layout for the gauge chart.
    var gaugeLayout = {  
      width: 700,
      plot_bgcolor:"rgb(234, 241, 213)",
      paper_bgcolor:"rgb(234, 241, 213)",
      margin: { t: 0, b: 0 }      
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);   





  });
}
