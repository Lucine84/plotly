function buildCharts(sample) {

    d3.json(`samples.json`).then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
  
      let sample_values = result.sample_values;
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      console.log(sample_values)
      var trace1 = {
        x: sample_values.slice(0, 10),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`),
        text: otu_labels.slice(0, 10),
        type: "bar",
        hovertext: otu_labels,
        orientation: "h",
        marker: {
          color: 'rgba(55,128,191,0.6)',
          width: 300
        }
  
      };
  
      var dataTrace = [trace1];
  
      var layout = {
        title: "TOP 10 OTUs",
        height: 800,
        width: 900
      };
  
      Plotly.newPlot("bar", dataTrace, layout);
  
    });
  }
  
  //metd
  function buildMetadata(metdataSample) {
    dem_selector = d3.select("#sample-metadata");
    d3.json(`samples.json`).then((metdata) => {
      var met_samples = metdata.metadata;
      var met_result = met_samples[0];
  
  
      var met_result_id = met_result.id;
      var met_result_eth = met_result.ethnicity;
      var met_result_gender = met_result.gender;
      var met_result_age = met_result.age;
      var met_result_location = met_result.location;
      var met_result_bbtype = met_result.bbtype;
      var met_result_wfreq = met_result.wfreq;
  
      console.log(met_result_id);
      console.log(met_result_eth);
      console.log(met_result_gender);
      console.log(met_result_age);
      console.log(met_result_location);
      console.log(met_result_bbtype);
      console.log(met_result_wfreq);
  
    });
  
  };
  
  //
  
  function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
  
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    buildCharts(newSample);
  }
  init();