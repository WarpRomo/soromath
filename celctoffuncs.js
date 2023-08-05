function celctofinit(){


  stats = [0,0];
  problemindex = 0;
  celctofproblems = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }


  document.getElementById("celctofproblems").style.top = "0px";
  document.getElementById("celctofinput").value = "";
  document.getElementById("celctofinput").focus();
  let currentproblems = document.getElementsByClassName("problem");

  while(currentproblems.length > 0){
    currentproblems[0].remove();
  }


  for(var i = 0; i < 20; i++){
    addcelctof(i==0, (i==0 ? 0 : null), currentdifficulty);
  }

}

function addcelctof(main=false,setproblem=null,difficulty){


  let num = 0;

  if(difficulty == 0){
    num = Math.floor(Math.random() * 100);
  }

  if(difficulty == 1){
    num = Math.floor(Math.random() * 150) - 50;
  }

  if(difficulty == 2){
    num = Math.floor(Math.random() * 1500 - 500) / 10;
  }



  if(setproblem == null) celctofproblems.push(num);
  else{
     celctofproblems.push(setproblem);
     num = setproblem
  }


  let problem = document.createElement("p");
  problem.innerHTML = num + "°C"
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("celctofproblems");
  problems.appendChild(problem);

}

function celctoftype(e){

  let input = document.getElementById("celctofinput")

  let nonums = "";
  let nums = "-0123456789."

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function celctofenter(e){
  if(e.key == "Enter" || e.key==" "){

    let input = document.getElementById("celctofinput")
    let problems = document.getElementById("celctofproblems");

    if(input.value.length == 0) return;

    if(problemindex == 0){

      starttest();


    }


    let inputnumber = parseInt(input.value);

    console.log(problems.children);

    input.value = "";

    let mainproblemindex = 0;

    for(var i = 0; i < problems.children.length; i++){
      if(problems.children[i].id == "mainproblem"){
        mainproblemindex = i;
      }
    }

    let problem = celctofproblems[problemindex]
    let answer = problem * 9/5 + 32

    console.log(answer);

    if(answer != inputnumber){
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

    addcelctof();

  }

}


function numonlyinput(){

}
