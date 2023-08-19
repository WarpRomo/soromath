
let profilecpmchart = null;


function initprofilechart(){

  var style = getComputedStyle(document.body)

  console.log("HEREAAA");

  profilecpmchart = new Chart("profilechart", {

      type: 'scatter',
      data: {
        labels: [],
        datasets: [{
          label: 'CPM',
          fill: false,
          lineTension: 0.5,
          backgroundColor: `rgb(0,0,0)`,
          borderColor: `rgb(0,0,0)`,
          data: []
        }]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
        legend: {display: true},
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data){
                    var label = `CPM: ${tooltipItem.yLabel}\n`;
                    var date = new Date(tooltipItem.xLabel);
                    return [label, `Date: ${date.toLocaleString()}`];
                }
            }
        },
        scales:{
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Calculations Per Minute',
              color: style.getPropertyValue('--text_color'),
              fontSize: 17,
            },
            gridLines:{
              color: style.getPropertyValue('--button_background'),
            },
            ticks:{
              beginAtZero: true,
              min: 0,
            },
          }],
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              display: false,
          }]
        }
      }
    });

}

function makeprofilechart(){

  if(profilecpmchart == null) initprofilechart()

  let filtered = [];

  let millis = [315576000000, 31557600000, 15778800000, 2629800000, 604800000]

  let times = ["15s", "60s", "120s"];

  let timechoice = times[timebuttons.indexOf(profiletime)];

  let timedistance = millis[days.indexOf(currentday)];

  let currenttime = new Date().getTime();

  let timelist = [];


  L: for(var i = completedtests.length - 1; i >= 0; i--){

    let dtime = currenttime - completedtests[i].date;

    if(dtime > timedistance) break;

    if(completedtests[i].mode.length != currentprofilemode.length) continue;

    for(var j = 0; j < completedtests[i].mode.length; j++){

      if(currentprofilemode.indexOf(completedtests[i].mode[j]) == -1){
        continue L;
      }

    }

    if(completedtests[i].time != timechoice) continue L;

    timelist.push(completedtests[i]);

  }

  timelist = timelist.reverse();

  let values = [];

  let pb = -1;
  let totalacc = 0;
  let testcount = timelist.length;


  for(var i = 0; i < timelist.length; i++){

    //let dtime = (timedistance - (currenttime - timelist[i].date)) / timedistance;


    if(timelist[i].cpm > pb) pb = timelist[i].cpm;

    totalacc += timelist[i].acc[0] / (timelist[i].acc[0] + timelist[i].acc[1])

    values.push({
      x: timelist[i].date,
      y: timelist[i].cpm
    })

  }

  totalacc = totalacc / timelist.length;
  totalacc = Math.floor(totalacc * 10000) / 100

  console.log(values);

  var style = getComputedStyle(document.body)

  document.getElementById("profilechartcontainer").style.display = "";
  document.getElementById("profilecharthide").style.display = "none";

  if(values.length >= requiredTests){
    profilecpmchart.data = {
      datasets: [{

        label: 'CPM',
        data: values,
        backgroundColor: style.getPropertyValue('--text_select_color'),
        borderColor: style.getPropertyValue('--text_select_color'),


      }]
    }

    profilecpmchart.update();

    document.getElementById("cpmstat").innerHTML = `PB: ${pb} CPM`
    document.getElementById("accstat").innerHTML = `Accuracy: ${totalacc}%`
    document.getElementById("testcountstat").innerHTML = `Test Count: ${testcount}`
  }
  else{
    document.getElementById("profilechartcontainer").style.display = "none";
    document.getElementById("profilecharthide").style.display = "";
  }





}
