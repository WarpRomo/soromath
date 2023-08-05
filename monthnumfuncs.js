function monthnuminit(){


  stats = [0,0];
  problemindex = 0;
  monthnumproblems = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }


  document.getElementById("monthnumproblems").style.top = "0px";
  document.getElementById("monthnuminput").value = "";
  document.getElementById("monthnuminput").focus();
  let currentproblems = document.getElementsByClassName("problem");

  while(currentproblems.length > 0){
    currentproblems[0].remove();
  }


  for(var i = 0; i < 20; i++){
    addmonthnum(i==0, (i==0 ? "september" : null));
  }

}

function addmonthnum(main=false,setproblem=null){

  let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

  let quest = months[Math.floor(Math.random() * months.length)];

  if(setproblem == null) monthnumproblems.push(quest);
  else{
     monthnumproblems.push(setproblem);
     quest = setproblem
  }


  let problem = document.createElement("p");
  problem.innerHTML = quest;
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("monthnumproblems");
  problems.appendChild(problem);

}

function monthnumtype(e){

  let input = document.getElementById("monthnuminput")

  let nonums = "";
  let nums = "0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function monthnumenter(e){
  if(e.key == "Enter" || e.key==" "){

    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

    let input = document.getElementById("monthnuminput")
    let problems = document.getElementById("monthnumproblems");

    if(input.value.length == 0) return;

    if(problemindex == 0){

      starttest();


    }


    let inputnumber = parseInt(input.value);

    input.value = "";

    let mainproblemindex = 0;

    for(var i = 0; i < problems.children.length; i++){
      if(problems.children[i].id == "mainproblem"){
        mainproblemindex = i;
      }
    }

    let problem = monthnumproblems[problemindex]
    let answer = months.indexOf(problem)+1;

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

    problemindex++;

    addmonthnum();

  }

}


function numonlyinput(){

}
