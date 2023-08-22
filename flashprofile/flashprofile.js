
let days = ["alltime", "1year", "6months", "1month", "1week"]
let currentday = "alltime"


let timebuttons = ["15sbutton", "60sbutton", "120sbutton"]
let profiletime = "15sbutton"


let currentprofilemode = ["addition"];

let requiredTests = 5;


let profiledifficultybuttons = ["easypbutton", "mediumpbutton", "hardpbutton"];
let profiledifficulty = "easypbutton";


let completedtests = localStorage.getItem("completedtests");
let completedparsed = false;
/*
let completedtests = [
  {
   cpm: 120,
   acc: [10,20],
   time:"15s",
   mode: ["addition"],
   date: 1692392598730 - 10*86400000
 },
 {
  cpm: 120,
  acc: [10,20],
  time:"15s",
  mode: ["addition"],
  date: 1692392598730 - 6*86400000
  },
  {
   cpm: 120,
   acc: [10,20],
   time:"15s",
   mode: ["addition"],
   date: 1692392598730 - 5.3*86400000
  },
  {
   cpm: 120,
   acc: [10,20],
   time:"15s",
   mode: ["addition"],
   date: 1692392598730 - 4*86400000
  },
  {
   cpm: 120,
   acc: [10,20],
   time:"15s",
   mode: ["addition"],
   date: 1692392598730 - 3*86400000
  },
]
*/

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
  makeprofilechart();

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
