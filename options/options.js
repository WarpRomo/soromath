let difficultybuttons = ["easybutton", "mediumbutton", "hardbutton", "custombutton"];
let difficultynames = ["easy", "medium", "hard", "custom"];

let optiontimebuttons = ["15sbuttontime", "60sbuttontime", "120sbuttontime"];
let optiontimenames = [15000, 60000, 120000];

let problemmode = "timed";

function setdifficulty(difficulty){

  let keys = Object.keys(modes);

  for(var i = 0; i < keys.length; i++){


    if(modes[keys[i]].settingsgui != undefined && modes[keys[i]].settings.presets != undefined){

      console.log(keys[i])

      if(modes[keys[i]].settingsgui.doneinit == false){
        modes[keys[i]].settingsgui.init(modes[keys[i]], false);
      }

      modes[keys[i]].settingsgui.setpreset(modes[keys[i]], difficulty)

    }

  }


  matchdifficulty();
  init();



}

function matchdifficulty(){

  let prev = null;

  let keys = currentmode;
  let newdifficulty = null;

  L: for(var i =0 ; i < keys.length; i++){

    if(modes[keys[i]].settingsgui == undefined || modes[keys[i]].settings.preset == undefined) continue;

    if(prev != null){

      if(modes[keys[i]].settings.preset != prev){
        newdifficulty = "custom";
        break L;
      }

    }

    prev = modes[keys[i]].settings.preset
    newdifficulty = prev

  }

  if(newdifficulty == undefined) return;

  let current = document.getElementById(difficultybuttons[difficultynames.indexOf(currentdifficulty)]);
  let pressed = document.getElementById(difficultybuttons[difficultynames.indexOf(newdifficulty)]);

  current.classList.remove("textselected");
  pressed.classList.add("textselected");

  currentdifficulty = newdifficulty;

  /*
  if(currentdifficulty != "custom"){
    document.getElementById("custombutton").disabled = true;
  }
  else{
    document.getElementById("custombutton").disabled = false;
  }
  */

  console.log("SAVING!");

}


function settime(elem, time){

  if(problemmode == "timed"){
    console.log("YH");
    totaltime = time;
    totalproblems = null;
  }
  else{
    console.log("NH")
    totaltime = null;
    totalproblems = time;
  }


  let current = document.getElementById("timeselected");
  current.id = "";
  current.classList.remove("textselected");

  elem.id = "timeselected";
  elem.classList.add("textselected");

  if(elem.classList.contains("customtimebutton") == false){

    let yar = document.getElementsByClassName("customtimebutton")[0];
    yar.innerHTML = "custom";

  }


  init();

}

function customtimetype(event){

  let nums = "0123456789"

  let filtered = "";

  for(var i =0 ; i < event.target.value.length; i++){

    if(nums.indexOf(event.target.value[i]) != -1){
      filtered += event.target.value[i];
    }

  }

  event.target.value = filtered;

}

function customtimeblur(event){

  let value = parseInt(event.target.value);

  if(value == 0 || value+"" == "NaN"){

    event.target.value = "";

  }
  else if(problemmode == "problems" && value == 1){
    event.target.value = "";
  }
  else{
    event.target.value = value;
  }

}

function switchtime(mode){

  let buttons = ["customtimetimed", "customtimeproblems" ];

  let input = document.getElementById("customtimeinp");

  if(mode == "timed"){

    document.getElementById(buttons[1]).classList.remove("textselected");
    document.getElementById(buttons[0]).classList.add("textselected");

    input.setAttribute("placeholder", "Seconds...");

  }

  if(mode == "problems"){

    document.getElementById(buttons[0]).classList.remove("textselected");
    document.getElementById(buttons[1]).classList.add("textselected");

    input.setAttribute("placeholder", "Problems...");

  }

  problemmode = mode;

}


function showcustomtime(){

  let container = document.getElementById("customtimecontainer")

  container.style.display = "";


}

function closetimecontainer(event){

  if(event.target.id == "customtimecontainer"){
    customtimedone();
  }

}

function customtimedone(userInput=true){

  let input = document.getElementById("customtimeinp");

  let timevalue = null

  if(userInput){
    if(input.value == ""){
      switchtime("timed")
      timevalue = 15;
    }
    else{
      timevalue = parseInt(input.value);
    }
  }
  else{

    if(problemmode == "timed") timevalue = totaltime / 1000;
    else timevalue = totalproblems;

  }


  document.getElementById("customtimecontainer").style.display = "none"



  if(problemmode == "timed"){


    timevalue *= 1000;

    if(optiontimenames.indexOf(timevalue) != -1){
      let name = optiontimebuttons[optiontimenames.indexOf(timevalue)];
      let elem = document.getElementsByClassName(name)[0];
      settime(elem, timevalue);
    }
    else{
      let elem = document.getElementsByClassName("customtimebutton")[0];
      settime(elem, timevalue);

      let text = "custom\n" + (timevalue / 1000) +"s";

      if(text.length > 11){
        text = "custom"
      }

      elem.innerHTML = text;

    }
  }
  else{

    let elem = document.getElementsByClassName("customtimebutton")[0];
    settime(elem, timevalue);

    let text = "custom\n" + (timevalue);

    if(text.length > 11){
      text = "custom"
    }

    elem.innerHTML = text;

  }

}
