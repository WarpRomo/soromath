function triginit(){


  stats = [0,0];
  problemindex = 0;
  trigproblems = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }


  document.getElementById("trigproblems").style.top = "0px";
  document.getElementById("triginput").value = "";
  document.getElementById("triginput").focus();
  let currentproblems = document.getElementsByClassName("problem");

  while(currentproblems.length > 0){
    currentproblems[0].remove();
  }


  for(var i = 0; i < 20; i++){
    addtrig(i==0, (i==0 ? ["sin","0"] : null));
  }

}

function addtrig(main=false,setproblem=null,difficulty=0){

  let funcs = ["sin","cos","tan"];
  let angles = ["0.5pi", "1pi", "1.5pi"]

  let func = funcs[Math.floor(Math.random() * funcs.length)];
  let angle = angles[Math.floor(Math.random() * angles.length)];

  if(setproblem == null) trigproblems.push([func,angle]);
  else{
     trigproblems.push(setproblem);
     func = setproblem[0]
     angle = setproblem[1]
  }


  let problem = document.createElement("p");
  problem.innerHTML = `${func}(${angle})`;
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("trigproblems");
  problems.appendChild(problem);

}

function trigtype(e){

  let input = document.getElementById("triginput")

  let nonums = "";
  let nums = "-0123456789sqrt()./inf"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function trigenter(e){
  if(e.key == "Enter" || e.key==" "){

    let input = document.getElementById("triginput")
    let problems = document.getElementById("trigproblems");

    if(input.value.length == 0) return;

    if(problemindex == 0){



      starttest();


    }


    let theinput = input.value;
    theinput = theinput.replace("sqrt", "Math.sqrt");

    let inputnumber = null

    if(theinput.startsWith("inf")){
      inputnumber = 1000;
    }
    else if(theinput.startsWith("-inf")){
      inputnumber = -1000
    }
    else{
      try{
        inputnumber = eval(theinput);
      }
      catch(err){
        inputnumber = null
      }
    }


    input.value = "";

    let mainproblemindex = 0;

    for(var i = 0; i < problems.children.length; i++){
      if(problems.children[i].id == "mainproblem"){
        mainproblemindex = i;
      }
    }

    let problem = trigproblems[problemindex]

    console.log(problem[1]);

    problem[1] = problem[1].split("pi").join("*Math.PI");

    let evalstring = `Math.${problem[0]}(${problem[1]})`;

    console.log(evalstring);

    let answer = eval(`Math.${problem[0]}(${problem[1]})`);


    if(Math.abs(answer) > 1000) answer = (Math.abs(answer) / answer) * 1000

    let dist = Math.abs(answer - inputnumber)

    if(dist > 0.01){
      problems.children[mainproblemindex].classList.add("wronganswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[1]++;
      problemcomplete(false);
    }
    else{
      problems.children[mainproblemindex].classList.add("rightanswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[0]++;
      problemcomplete(true)
    }

    let fadeoutelem = problems.children[mainproblemindex];

    setTimeout(() => {
      $(fadeoutelem).animate({ opacity: '0' }, {duration: 400, easing:"linear"});
    }, 500)

    problems.children[mainproblemindex].id = "";
    problems.children[mainproblemindex+1].id = "mainproblem";


    let top = parseInt(window.getComputedStyle(problems).top);

    top -= 40

    $(problems).animate({ top: top + 'px' }, {duration: 0, easing:"linear"});


    console.log(top);

    problemindex++;

    addtrig();

  }

}


function numonlyinput(){

}
