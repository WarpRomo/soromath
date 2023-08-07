function restarttest(){

  stats = [0,0];
  problemindex = 0;
  problemlist = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }

  templates[currenttemplate].init();

  let input = document.getElementsByClassName("maininput")[0];

  cpmtrack = [];
  rawcpmtrack = [];

  input.focus();

}


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


function finishtest(){

  console.log("CALLED!");

  document.getElementById("finishcorrect").innerHTML = stats[0] + " correct";
  document.getElementById("finishwrong").innerHTML = stats[1] + " wrong";

  let cpm = (60000 / totaltime) * stats[0];
  let rawcpm = (60000 / totaltime) * (stats[0] + stats[1]);


  document.getElementById("finishcpm").innerHTML = cpm + " cpm";
  document.getElementById("finishrawcpm").innerHTML = rawcpm + " raw cpm";

  let modestring = currentmode.join("<br>")

  document.getElementById("finishmode").innerHTML = "mode: \n" + modestring;
  document.getElementById("finishdifficulty").innerHTML = "difficulty: " + difficultynames[currentdifficulty];

  document.getElementById("finishtime").innerHTML = "time: " + (totaltime / 1000) + " seconds"

  document.getElementsByClassName("equation")[0].style.display = "none"
  document.getElementById("options").style.display = "none"
  document.getElementById("finishscreen").style.display = ""

  teststarted = false;

  makechart();


}
