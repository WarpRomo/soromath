
let cpmchart = null;


//let cpmtrack = [1,294,453,562,380,641,263,626,1010,293,384,436,1877,149,367,560]
//let rawcpmtrack = [1,294,453,562,380,641,263,626,1010,293,384,436,1877,149,367,560]
let cpmtrack = [];
let rawcpmtrack = [];

let lastcompleteraw = new Date().getTime();
let lastcomplete = new Date().getTime();

function problemcomplete(correct){

  let time = new Date().getTime();

  rawcpmtrack.push(time - lastcompleteraw);
  lastcompleteraw = time;

  if(correct){

    cpmtrack.push(time - lastcomplete);
    lastcomplete = time;

  }

}

function initchart(){

  var style = getComputedStyle(document.body)

  cpmchart = new Chart("cpmchart", {

      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: 'CPM',
          fill: false,
          lineTension: 0.5,
          backgroundColor: `rgb(0,0,0)`,
          borderColor: `rgb(0,0,0)`,
          data: []
        },{
          label: 'Raw CPM',
          fill: false,
          lineTension: 0.5,
          backgroundColor: `rgba(0,0,0,0.5)`,
          borderColor: `rgba(0,0,0,0.5)`,
          data: []
        }]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
        legend: {display: true},
        scales:{
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Calculations Per Minute',
              color: style.getPropertyValue('--text_color'),
              fontSize: 17,
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Seconds',
              color: style.getPropertyValue('--text_color'),
              fontSize: 20,
            }
          }]
        }
      }
    });

}

function makechart(){
  if(cpmchart == null) initchart();
  if(rawcpmtrack.length == 0) return;

  let cpmbuckets = [];
  let rawcpmbuckets = [];

  let overallcpmbuckets = [];

  let timeinterval = 3;
  let cumulative = 0;
  let rawcumulative = 0;

  console.log(totaltime);

  console.log(teststarted);

  if(totaltime != null) teststarted = totaltime;


  if(teststarted <= 10000){
    timeinterval = 1;
  }

  for(var i = 0; i <= teststarted / (1000 * timeinterval); i++){
    cpmbuckets.push(0);
    rawcpmbuckets.push(0);
    overallcpmbuckets.push(0);
  }

  for(var i = 0; i < cpmtrack.length; i++){
    cumulative += cpmtrack[i];
    let bucket = Math.floor(cumulative / (1000*timeinterval));
    if(bucket >= cpmbuckets.length) continue;
    cpmbuckets[bucket]++;
  }
  for(var i = 0; i < rawcpmtrack.length; i++){
    rawcumulative += rawcpmtrack[i];
    let rawbucket = Math.floor(rawcumulative / (1000*timeinterval));
    if(rawbucket >= cpmbuckets.length) continue;
    rawcpmbuckets[rawbucket]++;
  }

  let xvalues = [];

  for(var i = timeinterval; i <= teststarted / 1000; i+=timeinterval){
    xvalues.push(i);
  }

  let overallcumulative =  0;

  for(var i = 0; i < cpmbuckets.length; i++){

    overallcumulative += cpmbuckets[i];
    overallcpmbuckets[i] = Math.floor(60*overallcumulative / ((i+1) * timeinterval));

  }

  console.log(cpmtrack);
  console.log(rawcpmtrack);
  console.log(cpmbuckets);
  console.log(rawcpmbuckets);
  console.log(60 / timeinterval);

  for(var i = 0; i < cpmbuckets.length; i++){
    cpmbuckets[i] *= (60 / timeinterval);
    rawcpmbuckets[i] *= (60 / timeinterval);
  }

  var style = getComputedStyle(document.body)

  cpmchart.data = {
    labels: xvalues,
    datasets: [{
      label: 'CPM',
      fill: false,
      lineTension: 0.25,
      backgroundColor: style.getPropertyValue('--text_select_color'),
      borderColor: style.getPropertyValue('--text_select_color'),
      data: cpmbuckets
    },{
      label: 'Raw CPM',
      fill: false,
      lineTension: 0.25,
      backgroundColor: `rgba(0,0,0,0.5)`,
      borderColor: `rgba(0,0,0,0.5)`,
      data: rawcpmbuckets
    },{
      label: 'Overall CPM',
      fill: false,
      lineTension: 0.25,
      backgroundColor: style.getPropertyValue('--text_color'),
      borderColor: style.getPropertyValue('--text_color'),
      data: overallcpmbuckets
    }]
  }

  if(teststarted < 1100){
    console.log("YE");
    cpmchart.data = {
      labels: xvalues,
      datasets: [{
        label: 'CPM',
        fill: false,
        lineTension: 0.25,
        backgroundColor: style.getPropertyValue('--text_select_color'),
        borderColor: style.getPropertyValue('--text_select_color'),
        data: []
      },{
        label: 'Raw CPM',
        fill: false,
        lineTension: 0.25,
        backgroundColor: `rgba(0,0,0,0.5)`,
        borderColor: `rgba(0,0,0,0.5)`,
        data: []
      },{
        label: 'Overall CPM',
        fill: false,
        lineTension: 0.25,
        backgroundColor: style.getPropertyValue('--text_color'),
        borderColor: style.getPropertyValue('--text_color'),
        data: []
      }]
    }
  }

  cpmchart.update();


}
