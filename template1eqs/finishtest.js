function restarttest(focus=true){

  stats = [0,0];
  problemindex = 0;
  problemlist = [];
  teststarted = 0;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }

  templates[currenttemplate].init()

  let input = document.getElementsByClassName("maininput")[0];

  cpmtrack = [];
  rawcpmtrack = [];

  if(focus) window.setTimeout( () => input.focus(), 50 );

}


function hidefinish(){

  document.getElementById("finishscreen").style.display = "none";
  document.getElementById("options").style.display = ""

}


function starttest(){

  lastcompleteraw = new Date().getTime();
  lastcomplete = new Date().getTime();
  teststarted = 0;

  let lasttime = new Date().getTime();

  testcheckend = setInterval(() => {

    let time = new Date().getTime();
    let dt = time - lasttime;
    lasttime = new Date().getTime();

    if(synth.speaking) {
      //dt = 0;
    }

    teststarted += dt;

    if((totalproblems != null && problemindex == totalproblems) || (totaltime != null && teststarted >= totaltime) ){

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

  if(templates[currenttemplate].finish != undefined) templates[currenttemplate].finish();

  if(totaltime != null) teststarted = totaltime;

  document.getElementById("finishcorrect").innerHTML = stats[0] + " correct";
  document.getElementById("finishwrong").innerHTML = stats[1] + " wrong";

  let cpm = (60000 / teststarted) * stats[0];
  let rawcpm = (60000 / teststarted) * (stats[0] + stats[1]);


  let cpmstring = Math.floor(cpm);
  let rawcpmstring = Math.floor(rawcpm);

  if(cpm < 10){
    cpmstring = Math.floor(cpm * 10) / 10;
    rawcpmstring = Math.floor(cpm * 10) / 10;
  }


  if(cpm > 1 || cpm == 0){
    document.getElementById("finishcpm").innerHTML = cpmstring + " cpm";
    document.getElementById("finishrawcpm").innerHTML = rawcpmstring + " raw cpm";
  }
  else{
    cpmstring = 1 / (cpm / 60);
    rawcpmstring = 1 / (rawcpm / 60);

    cpmstring = Math.floor(cpmstring * 10) / 10;
    rawcpmstring = Math.floor(cpmstring * 10) / 10;

    document.getElementById("finishcpm").innerHTML = cpmstring + " spc";
    document.getElementById("finishrawcpm").innerHTML = rawcpmstring + " raw spc";
  }


  let modestring = currentmode.join("<br>")

  document.getElementById("finishmode").innerHTML = "mode: \n" + modestring;
  document.getElementById("finishdifficulty").innerHTML = "difficulty: " + (voicemodeenabled ? "voice " : "") + currentdifficulty;

  document.getElementById("finishtime").innerHTML = "time: " + (totaltime / 1000) + " seconds"

  if(totalproblems != null){

    document.getElementById("finishtime").innerHTML = (teststarted / 1000) + " seconds<br>" + totalproblems + " problems"

  }

  document.getElementsByClassName("equation")[0].style.display = "none"
  document.getElementById("options").style.display = "none"
  document.getElementById("finishscreen").style.display = ""

  if(!voicemodeenabled){

    let addtime = totaltime;
    if(totaltime == null) addtime = teststarted;

    addcompleted({
       cpm: cpm,
       acc: [stats[0],stats[1]],
       time: (totaltime / 1000)+"s",
       difficulty: difficultynames.indexOf(currentdifficulty),
       mode: currentmode,
       date: new Date().getTime()
    })
  }

  makechart();

  teststarted = 0;


}
