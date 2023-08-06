
let problemindex = 0;
let additionproblems = []
let totaltime = 15000;
let teststarted = false;
let testcheckend = null;
let stats = [0,0];
let problemlist = [];

let cpmchart = null;

let currentinit = additioninit;

let currentmode = "addition";

let currentdifficulty = 0;
let difficultybuttons = ["easybutton", "mediumbutton", "hardbutton"];
let difficultynames = ["easy", "medium", "hard"];

let modes = {
  "addition": {
    init: additioninit,
    id: "additionequation",
    diffs: [0,1,2],
  },
  "multiplication":{
    init:multinit,
    id: "multequation",
    diffs: [0,1,2]
  },
  "subtraction": {
    init: subtractioninit,
    id: "subtractionequation",
    diffs: [0,1,2],
  },
  "division":{
    init:divisioninit,
    id: "divisionequation",
    diffs: [0,1,2]
  },
  "trigonometry":{
    init: triginit,
    id: "trigequation",
    diffs: [0],
  },
  "celsius to fahrenheit":{
    init: celctofinit,
    id: "celctofequation",
    diffs: [0,1,2],
  },
  "month to number":{
    init: monthnuminit,
    id: "monthnumequation",
    diffs: [0]
  }
}

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


function restarttest(){

  modes[currentmode].init();

  let input = document.getElementsByClassName("maininput")[0];

  input.focus();

}


function setdifficulty(difficulty){

  let current = document.getElementById(difficultybuttons[currentdifficulty]);
  let pressed = document.getElementById(difficultybuttons[difficulty]);

  current.classList.remove("difficultyselected");
  pressed.classList.add("difficultyselected");

  currentdifficulty = difficulty

  init();

}

function settime(elem, time){

  totaltime = time;

  let current = document.getElementById("timeselected");
  current.id = "";
  elem.id = "timeselected";

  init();

}

function setmode(mode){

}

let modeselect = null;
function modeinit(){

  let keys = Object.keys(modes);

  let modeselect = document.getElementById("modeselect")

  for(var i = 0; i < keys.length; i++){

    let buttonelem = document.createElement("button");
    buttonelem.onclick = `setmode(${keys[i]})`;


    buttonelem.classList.add("zulubutton");
    buttonelem.classList.add("modebutton");

    buttonelem.id = "modebutton" + keys[i];

    buttonelem.innerHTML = keys[i];

    if(keys[i] == currentmode){
      buttonelem.classList.add("modeselected");
    }
    else{
      buttonelem.classList.remove("modeselected");
    }


    let num = i;

    buttonelem.onclick = () => {


      let container = document.getElementById("modecontainer");
      container.style.display = "none";

      currentmode = keys[num];

      let current = document.getElementsByClassName("modeselected");
      current[0].classList.remove("modeselected");

      buttonelem.classList.add("modeselected");


      document.getElementById("modeselectbutton").innerHTML = keys[num];




      init();





    }


    modeselect.appendChild(buttonelem);

  }





}


function init(){




  let keys = Object.keys(modes);

  document.getElementById("options").style.display = "";

  for(var i = 0; i < keys.length; i++){
    let element = document.getElementById(modes[keys[i]].id);

    if(keys[i] != currentmode){

      element.style.display = "none";
      element.classList.remove("equation")

    }
    else{

      element.classList.add("equation")
      element.style.display = "";

    }

  }

  //$('.problem').css('opacity', '0')

  modes[currentmode].init();



  if(currentdifficulty >= modes[currentmode].diffs.length){

    setdifficulty(modes[currentmode].diffs.length-1);

  }

  for(var i = 0; i < difficultybuttons.length; i++){

    let button = document.getElementById(difficultybuttons[i])

    if(modes[currentmode].diffs.indexOf(i) == -1){

      button.disabled = true;

    }
    else{
      button.disabled = false;
    }


  }


  if(modeselect == null){
    modeselect = "yarr";
    modeinit();
  }

  if(themeselect == null){
    themeselect = "yarr";
    themeinit();
    changetheme(currenttheme);
  }

  if(cpmchart == null){
    initchart();
  }

  document.getElementById("finishscreen").style.display = "none"

  cpmtrack = [];
  rawcpmtrack = [];

}


function showmodeselect(){

  let container = document.getElementById("modecontainer");

  container.style.display = "";

}


function removemodefocus(event){

  if(event.target.id != "modecontainer") return;

  let container = document.getElementById("modecontainer");

  container.style.display = "none";

}

setInterval(settimer);

function starttest(){

  lastcompleteraw = new Date().getTime();
  lastcomplete = new Date().getTime();
  teststarted = new Date().getTime();
  testcheckend = setInterval(() => {

    let time = new Date().getTime();
    if(time - teststarted >= totaltime){

      console.log("HERE");

      finishtest();

      console.log("CLEAR IT");

      clearInterval(testcheckend);

    }


  })

  //$('.problem').animate({opacity: 0.5}, 0)

}

function settimer(){

  let elements = document.getElementsByClassName("timershow");

  for(var i = 0; i < elements.length; i++){

    if(window.getComputedStyle(elements[i]).display != "none"){






      const ctx = elements[i].getContext("2d");

      elements[i].width = 120;
      elements[i].height = 120;

      let starttime = ((!teststarted) ? (new Date().getTime()) : teststarted);
      let timeportion = ((new Date().getTime()) - starttime) / totaltime;

      ctx.beginPath();
      ctx.arc(60, 60, 50, 0, 2 * Math.PI * timeportion);

      ctx.lineTo(60, 60)
      ctx.moveTo(60, 60)
      ctx.lineTo(110, 60)

      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath()
      ctx.arc(60, 60, 50, 0, 2 * Math.PI);
      ctx.lineWidth = 5
      ctx.strokeStyle = "white";
      ctx.stroke();



    }



  }


}

function finishtest(){

  console.log("CALLED!");

  document.getElementById("finishcorrect").innerHTML = stats[0] + " correct";
  document.getElementById("finishwrong").innerHTML = stats[1] + " wrong";

  let cpm = (60000 / totaltime) * stats[0];
  let rawcpm = (60000 / totaltime) * (stats[0] + stats[1]);


  document.getElementById("finishcpm").innerHTML = cpm + " cpm";
  document.getElementById("finishrawcpm").innerHTML = rawcpm + " raw cpm";

  document.getElementById("finishmode").innerHTML = "mode: " + currentmode;
  document.getElementById("finishdifficulty").innerHTML = "difficulty: " + difficultynames[currentdifficulty];

  document.getElementById("finishtime").innerHTML = "time: " + (totaltime / 1000) + " seconds"

  document.getElementsByClassName("equation")[0].style.display = "none"
  document.getElementById("options").style.display = "none"
  document.getElementById("finishscreen").style.display = ""

  teststarted = false;

  makechart();


}

function initchart(){

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
      }
    });

}

function makechart(){
  if(cpmchart == null) initchart();
  if(rawcpmtrack.length == 0) return;

  let cpmbuckets = [];
  let rawcpmbuckets = [];
  let timeinterval = 3;
  let cumulative = 0;
  let rawcumulative = 0;

  for(var i = 0; i <= totaltime / (1000 * timeinterval); i++){
    cpmbuckets.push(0);
  }
  for(var i = 0; i <= totaltime / (1000 * timeinterval); i++){
    rawcpmbuckets.push(0);
  }

  for(var i = 0; i < cpmtrack.length; i++){
    cumulative += cpmtrack[i];
    let bucket = Math.floor(cumulative / (1000*timeinterval));
    cpmbuckets[bucket]++;
  }
  for(var i = 0; i < rawcpmtrack.length; i++){
    rawcumulative += rawcpmtrack[i];
    let rawbucket = Math.floor(rawcumulative / (1000*timeinterval));
    rawcpmbuckets[rawbucket]++;
  }

  let xvalues = [];

  for(var i = 3; i <= totaltime / 1000; i+=timeinterval){
    xvalues.push(i);
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
    }]
  }
  cpmchart.update();



}
