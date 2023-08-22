let difficultybuttons = ["easybutton", "mediumbutton", "hardbutton", "custombutton"];
let difficultynames = ["easy", "medium", "hard", "custom"];

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

  if(currentdifficulty != "custom"){
    document.getElementById("custombutton").disabled = true;
  }
  else{
    document.getElementById("custombutton").disabled = false;
  }

}


function settime(elem, time){

  totaltime = time;

  let current = document.getElementById("timeselected");
  current.id = "";
  current.classList.remove("textselected");

  elem.id = "timeselected";
  elem.classList.add("textselected");

  init();

}
