function monthnuminit(){


  stats = [0,0];
  problemindex = 0;
  problemlist = [];
  teststarted = false;

  if(testcheckend != null){
    clearInterval(testcheckend);
    testcheckend = null;
  }

  let currentmain = document.getElementsByClassName("mainproblems")[0];
  currentmain.classList.remove("mainproblems");
  document.getElementById("monthnuminput").classList.add("mainproblems");

  let currentmaininput = document.getElementsByClassName("maininput")[0];
  currentmaininput.classList.remove("maininput");
  document.getElementById("monthnuminput").classList.add("maininput");


  document.getElementById("monthnumproblems").style.top = "0px";
  document.getElementById("monthnuminput").value = "";

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

  if(setproblem == null) problemlist.push(quest);
  else{
     problemlist.push(setproblem);
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
function monthnumanswer(problem){
  let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  return months.indexOf(problem);
}

function monthnumvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}

function monthnumenter(e){
  validateanswer(e, monthnumvalidate, addmonthnum, monthnumanswer, "monthnuminput", "monthnumproblems");
}
