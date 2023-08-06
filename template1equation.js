

let templates = ["template1equation"];

function settemplate(template, settings){

  stats = [0,0];
  problemindex = 0;
  problemlist = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }

  for(var i = 0; i < templates.length; i++){
    let templateelement = document.getElementById(templates[i]);
    if(templates[i] != template){
      templateelement.style.display = "none";
    }
    else{
      templateelement.style.display = "";
    }
  }

  if(template == "template1equation"){

    document.getElementById("template1problems").className = `problems mainproblems ${settings.name}problems`

    let input = document.getElementById("template1input")
    input.className = `numinput maininput ${settings.name}input`
    input.setAttribute("oninput", `${settings.name}type(event); ${settings.name}enter(event)`)
    input.setAttribute("onkeypress", `${settings.name}enter(event,true);`)
    input.setAttribute("inputmode", (settings.inputmode || ""))

    let problemcontainer = document.getElementById("problemscontainer");
    problemcontainer.style.top = settings.offset || "-85px";

    document.getElementById("template1problems").style.top = "0px"
    document.getElementById("template1input").value = ""

    problemlist = [];

    let currentproblems = document.getElementsByClassName("problem");

    while(currentproblems.length > 0){
      currentproblems[0].remove();
    }



  }

}


function validateanswer(e, validater, addproblem, getanswer, press=false, scrollamount=40){

    if(press && e.key != "Enter") return;
    if(press) console.log("YAA");

    let input = document.getElementsByClassName("maininput")[0]
    let problems = document.getElementById("template1problems");



    if(input.value.length == 0) return;

    let inputnumber = input.value;
    let mainproblemindex = 0;

    for(var i = 0; i < problems.children.length; i++){
      if(problems.children[i].id == "mainproblem"){
        mainproblemindex = i;
      }
    }

    let problem = problemlist[problemindex]
    let answer = getanswer(problem);

    let correct = validater(answer, inputnumber);


    if( !(correct || e.key == "Enter") ) return;
    input.value = "";

    if(problemindex == 0){
      starttest();
    }

    if(correct){
      problems.children[mainproblemindex].classList.add("rightanswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[0]++;
      console.log("GO", cpmtrack.length);
      problemcomplete(true)
    }
    else{
      problems.children[mainproblemindex].classList.add("wronganswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[1]++;
      problemcomplete(false);
    }

    let fadeoutelem = problems.children[mainproblemindex];

    setTimeout(() => {
      $(fadeoutelem).animate({ opacity: '0' }, {duration: 400, easing:"linear"});
    }, 500)


    let oldheight = problems.children[mainproblemindex].getBoundingClientRect().height

    problems.children[mainproblemindex].id = "";
    problems.children[mainproblemindex+1].id = "mainproblem";


    let top = parseInt(window.getComputedStyle(problems).top);

    top -= oldheight

    $(problems).animate({ top: top + 'px' }, {duration: 0});


    problemindex++;

    addproblem(false, null, currentdifficulty);

}
