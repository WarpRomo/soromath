function subtractioninit(){


  stats = [0,0];
  problemindex = 0;
  subtractionproblems = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }


  document.getElementById("subtractionproblems").style.top = "0px";
  document.getElementById("subtractioninput").value = "";
  document.getElementById("subtractioninput").focus();
  let currentproblems = document.getElementsByClassName("problem");

  while(currentproblems.length > 0){
    currentproblems[0].remove();
  }


  for(var i = 0; i < 20; i++){
    addsubtraction(i==0, (i==0 ? [0,0] : null), currentdifficulty);
  }

}

function addsubtraction(main=false,setproblem=null,difficulty=0){

  let num1 = 0;
  let num2 = 0;

  if(difficulty == 0){
    num1 = Math.floor(Math.random() * 10)
    num2 = Math.floor(Math.random() * 10);
  }
  if(difficulty == 1){
    num1 = Math.floor(Math.random() * 100)
    num2 = Math.floor(Math.random() * 100);
  }
  if(difficulty == 2){
    num1 = Math.floor(Math.random() * 1000)
    num2 = Math.floor(Math.random() * 1000);
  }

  if(setproblem == null) subtractionproblems.push([num1,num2]);
  else{
     subtractionproblems.push(setproblem);
     num1 = setproblem[0]
     num2 = setproblem[1]
  }


  let problem = document.createElement("p");
  problem.innerHTML = num1 + "-" + num2 + " " + "="
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("subtractionproblems");
  problems.appendChild(problem);

}

function subtractiontype(e){

  let input = document.getElementById("subtractioninput")

  let nonums = "";
  let nums = "-0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function subtractionenter(e){
  if(e.key == "Enter" || e.key==" "){

    let input = document.getElementById("subtractioninput")
    let problems = document.getElementById("subtractionproblems");

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

    let problem = subtractionproblems[problemindex]
    let answer = problem[0] - problem[1];

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

    addsubtraction();

  }

}
