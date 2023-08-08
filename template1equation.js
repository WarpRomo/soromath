

let templates = {

  "template1equation":{
    init: template1init,
  }

};

let t1heighttrack = 0;

function settemplate(template, settings){

  stats = [0,0];
  problemindex = 0;
  problemlist = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }

  currenttemplate = template;

  for(var i = 0; i < templates.length; i++){
    let templateelement = document.getElementById(templates[i]);
    if(templates[i] != template){
      templateelement.style.display = "none";
    }
    else{
      templateelement.style.display = "";
    }
  }

}

function template1init(instantgen = false){

  t1heighttrack = 0;

  document.getElementById("template1equation").style.display = ""

  let input = document.getElementById("template1input")
  input.value = ""

  let problemcontainer = document.getElementById("problemscontainer");

  let mask = document.getElementsByClassName("problemmask")[0]
  mask.style.height = "290px";

  problemlist = [];

  setTimeout( () => {

    let currentproblems = document.getElementsByClassName("problem");

    while(currentproblems.length > 0){
      currentproblems[0].remove();
    }


    for(var i = 0; i < 7; i++){

      let problemtype = currentmode[Math.floor(Math.random() * currentmode.length)];
      let problem = modes[problemtype].addproblem(main=i == 0, difficulty=currentdifficulty, name=problemtype);

      if(i == 0){


        let p1height = problem.getBoundingClientRect().height
        let inputheight = input.getBoundingClientRect().height

        t1heighttrack = (inputheight - p1height) / 2 - 5
        document.getElementById("template1problems").style.top = t1heighttrack + "px";

      }

    }
  }, instantgen ? 0 : 100);

}


function template1type(e){

  let problemtype = problemlist[problemindex][0];
  modes[problemtype].ontype(e);

}

function template1enter(e, press=false){

    if(press && e.key != "Enter") return;

    let input = document.getElementsByClassName("maininput")[0]
    let problems = document.getElementById("template1problems");

    if(input.value.length == 0) return;

    let inputnumber = input.value;
    let mainproblemindex = problemindex;
    let problemtype = problemlist[problemindex][0];


    let problem = problemlist[problemindex]

    let answer = modes[problemtype].getanswer(problem[1]);
    let correct = modes[problemtype].validate(answer, inputnumber);


    console.log(answer, correct)

    if( !(correct || e.key == "Enter") ) return;
    input.value = "";

    if(problemindex == 0){

      starttest();
      let mask = document.getElementsByClassName("problemmask")[0]
      mask.style.height = "1000px";

    }

    if(correct){
      problems.children[mainproblemindex].classList.add("rightanswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[0]++;
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


    let height1 = problems.children[mainproblemindex].getBoundingClientRect().height
    let height2 = problems.children[mainproblemindex+1].getBoundingClientRect().height

    let shifttop = (height1 + height2) / 2

    problems.children[mainproblemindex].id = "";
    problems.children[mainproblemindex+1].id = "mainproblem";


    let top = parseInt(window.getComputedStyle(problems).top);

    t1heighttrack -= shifttop;
    top = Math.floor(t1heighttrack);

    $(problems).animate({ top: top + 'px' }, {duration: 0});

    problemindex++;

    let nextproblem = currentmode[Math.floor(Math.random() * currentmode.length)];
    modes[nextproblem].addproblem(main=false, difficulty=currentdifficulty, name=nextproblem);

}
