
let t1heighttrack = 0;

let problemindex = 0;
let problemlist = [];
let stats = [0,0];

let totaltime = 15000;
let totalproblems = null;
let teststarted = 0;
let testcheckend = null;


function settemplate(template){

  currenttemplate = template;

  let templatekeys = Object.keys(templates)


  for(var i = 0; i < templatekeys.length; i++){

    let templateelement = document.getElementById(templatekeys[i]);


    if(templatekeys[i] != template){
      templateelement.style.display = "none";

      if(templates[templatekeys[i]].notit != undefined){

        templates[templatekeys[i]].notit();

      }

    }
    else{
      templateelement.style.display = "";
    }
  }


  templates[template].init();

}

function template1finish(){
  let mask = document.getElementsByClassName("problemmask")[0]
  mask.style.height = "400px";
}


function template1init(){


  if(voicemodeenabled){
    document.getElementById("voicemodetext").style.display = "";

    if (synth.speaking) {
      synth.cancel();
    }

    voiceinit();

  }
  else{
    document.getElementById("voicemodetext").style.display = "none";
  }

  t1heighttrack = 0;

  let myself = document.getElementById("template1equation");
  myself.style.display = "";

  let input = document.getElementById("template1input")

  input.value = ""

  document.getElementById("difficultyoption").style.display = "";

  let problemcontainer = document.getElementById("problemscontainer");

  let mask = document.getElementsByClassName("problemmask")[0]

  let currentheight = mask.style.height;
  let newheight = "400px";

  mask.style.height = newheight;

  setTimeout( () => {

    let currentproblems = document.getElementsByClassName("problem");

    while(currentproblems.length > 0){
      currentproblems[0].remove();
    }

    problemlist = [];

    for(var i = 0; i < 7; i++){

      let problemtype = currentmode[Math.floor(Math.random() * currentmode.length)];

      if(totalproblems != null && problemlist.length == totalproblems) return;

      if(i == 0) console.log(problemtype);

      let problem = addrandproblem();

      if(i == 0){


        let p1height = problem.getBoundingClientRect().height
        let inputheight = input.getBoundingClientRect().height

        t1heighttrack = (inputheight - p1height) / 2 - 2
        document.getElementById("template1problems").style.top = t1heighttrack + "px";

      }

    }
  }, currentheight == newheight ? 0 : 100);

  matchdifficulty();
  console.log("save dat")
  savedifficulty();

}

function template1switch(){

  restarttest(false);

}


function template1type(e){

  let problemtype = problemlist[problemindex][0];
  modes[problemtype].ontype(e);

}

function template1enter(e, press=false){

    if(totalproblems != null && problemindex == totalproblems){
      console.log("RETURN");
      return;
    }

    if(press && e.key != "Enter") return;

    let input = document.getElementsByClassName("maininput")[0]
    let problems = document.getElementById("template1problems");

    if(input.value.length == 0){
      if(voicemodeenabled && e.key == "Enter"){
        revoiceproblem();
      }
       return;
     }

    let inputnumber = input.value;
    let mainproblemindex = problemindex;
    let problemtype = problemlist[problemindex][0];


    let problem = problemlist[problemindex]

    let answer = modes[problemtype].getanswer(problem[1]);
    let correct = modes[problemtype].validate(answer, inputnumber);


    console.log(answer, correct)

    if(voicemodeenabled && problemindex == 0){

      starttest();
      correct = true;
      document.getElementById("voicemodetext").style.display = "none";

    }


    if( !(correct || e.key == "Enter" || correct == "fail") ) return;

    if(correct == "fail") correct = false;

    if(!voicemodeenabled) input.value = "";
    else{
      setTimeout(() => {input.value=""}, 50);
    }

    if(!voicemodeenabled && problemindex == 0){

      starttest();
      let mask = document.getElementsByClassName("problemmask")[0]
      mask.style.height = "1000px";

    }

    if(correct){
      problems.children[mainproblemindex].classList.add("rightanswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[0]++;
      problemcomplete(true)

      if(voicemodeenabled){

        let correct = flashcorrect.cloneNode();
        correct.volume = 0.07
        correct.play()

      }

    }
    else{
      problems.children[mainproblemindex].classList.add("wronganswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[1]++;
      problemcomplete(false);

      if(voicemodeenabled){

        let wrong = flashwrong.cloneNode()
        wrong.volume = 0.07
        wrong.play()

      }

    }

    let fadeoutelem = problems.children[mainproblemindex];

    setTimeout(() => {
      $(fadeoutelem).animate({ opacity: '0' }, {duration: 400, easing:"linear"});
    }, 500)

    if(!(totalproblems != null && problemindex + 1 == totalproblems)){
      let height1 = problems.children[mainproblemindex].getBoundingClientRect().height
      let height2 = problems.children[mainproblemindex+1].getBoundingClientRect().height

      let shifttop = (height1 + height2) / 2

      problems.children[mainproblemindex].id = "";
      problems.children[mainproblemindex+1].id = "mainproblem";


      let top = parseInt(window.getComputedStyle(problems).top);

      t1heighttrack -= shifttop;
      top = Math.floor(t1heighttrack);

      $(problems).animate({ top: top + 'px' }, {duration: 0});
    }

    problemindex++;

    if( !(totalproblems != null && problemlist.length >= totalproblems) ){

      addrandproblem();

    }


    if(voicemodeenabled){

      voiceproblem();

    }


}


let gentrials = 0;

function addrandproblem(){

  let problem = null;

  while(true){

    gentrials++;

    let nextproblem = currentmode[Math.floor(Math.random() * currentmode.length)];
    problem = modes[nextproblem].addproblem(problemlist.length == 0, modes[nextproblem], name=nextproblem);


    if(recentduplicate()){
      if(problem != undefined) problem.remove();
      problemlist.pop();
    }
    else{
      break;
    }

  }

  gentrials = 0;

  return problem;

}


function recentduplicate(){

  if(gentrials > 20 || problemlist.length <= 1){
    return false;
  }

  if(problemlist.length > 1){

    let e1 = problemlist[problemlist.length - 1];

    for(var i = problemlist.length - 2; i >= 0 && i >= problemlist.length - 7; i--){

      let e2 = problemlist[i];

      if(e1[0] == e2[0] && JSON.stringify(e1[1]) == JSON.stringify(e2[1])){


        return true;
      }

    }

  }

  return false;

}


function revoiceproblem(){

  voiceproblem(0);

  setTimeout( () => {
    document.getElementById("template1input").focus();
  }, 50)

}

function voiceproblem(delay=500){
  let text = "error";

  if("speechText" in modes[problemlist[problemindex][0]]){

    text = modes[problemlist[problemindex][0]].speechText(problemlist[problemindex][1]);

  }


  setTimeout(() => {
    synthesisvoice(text);
  }, delay)
}
