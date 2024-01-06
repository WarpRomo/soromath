
let days = ["alltime", "1year", "6months", "1month", "1week"]
let currentday = "alltime"


let timebuttons = ["15sbutton", "60sbutton", "120sbutton"]
let profiletime = "15sbutton"

let profileproblemcount = 0;


let currentprofilemode = ["addition"];

let requiredTests = 5;


let profiledifficultybuttons = ["easypbutton", "mediumpbutton", "hardpbutton"];
let profiledifficulty = "easypbutton";

let completedtests = localStorage.getItem("completedtests");
let completedparsed = false;

function addcompleted(obj){

  completedtests.push(obj);
  localStorage.setItem("completedtests", JSON.stringify(completedtests));

}

function profileinit(){

  if(!completedparsed){
    if(completedtests == null){
      completedtests = [];
    }
    else{
      completedtests = JSON.parse(completedtests);
    }
    completedparsed = true;
  }


  setdaybutton();
  setprofiletimebutton();
  setprofiledifficultybutton();
  initproblemcount();
  makeprofilechart();

}

function initproblemcount(){

  console.log("yesss");

  if(profileproblemcount > 1){
    document.getElementById("profileproblemcount").value = profileproblemcount;
  }
}

function setprofileproblemcount(val=false){

  let allowed = "0123456789";

  let chars = "";

  let input = document.getElementById("profileproblemcount");

  for(var i = 0; i < input.value.length; i++){

    if(allowed.indexOf(input.value[i]) != -1) chars += input.value[i];

  }

  chars = parseInt(chars);

  if(val != false) chars = val;

  if(chars+"" == "NaN" || chars < 2){
    profileproblemcount = 1;
    input.value = "";
    if(val == false) setprofiletimebutton('15sbutton');
  }
  else{
    input.value = chars;
    profileproblemcount = chars;
    profiletime = 'lol';
    setprofiletimebutton('');
  }




}

function setdaybutton(day=null){

  let prevday = currentday;
  if(day != null) currentday = day;
  if(currentday != prevday) makeprofilechart();

  for(var i = 0; i < days.length; i++){

    let btn = document.getElementById(days[i]);

    if(days[i] == currentday){
      if(!btn.classList.contains("textselected")) btn.classList.add("textselected")
    }
    else{
      if(btn.classList.contains("textselected")) btn.classList.remove("textselected")
    }


  }

}

function setprofiletimebutton(time=null){

  let prevtime = profiletime;

  if(time != null) profiletime = time;
  if(time != "" && time != null) setprofileproblemcount(1);

  if(profiletime != prevtime) makeprofilechart();

  for(var i = 0; i < timebuttons.length; i++){

    let btn = document.getElementById(timebuttons[i]);

    if(timebuttons[i] == profiletime){
      if(!btn.classList.contains("textselected")) btn.classList.add("textselected")
    }
    else{
      if(btn.classList.contains("textselected")) btn.classList.remove("textselected")
    }

  }

}

function setprofiledifficultybutton(difficulty=null){

  let prevtime = profiledifficulty;
  if(difficulty != null) profiledifficulty = difficulty;
  if(profiledifficulty != prevtime) makeprofilechart();

  for(var i = 0; i < profiledifficultybuttons.length; i++){

    let btn = document.getElementById(profiledifficultybuttons[i]);

    if(profiledifficultybuttons[i] == profiledifficulty){
      if(!btn.classList.contains("textselected")) btn.classList.add("textselected")
    }
    else{
      if(btn.classList.contains("textselected")) btn.classList.remove("textselected")
    }

  }

}
