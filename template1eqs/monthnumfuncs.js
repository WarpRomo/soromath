let monthnumpreset = {
  id: "monthnumequation",
  template: "template1equation",
  addproblem: addmonthnum,
  ontype: monthnumtype,
  getanswer: monthnumanswer,
  validate: monthnumvalidate,
  speechText: monthnumspeech,
  settings: {
    name: "monthnum",

  }
}

function addmonthnum(main=false,difficulty=null,name=null){

  let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

  let quest = months[Math.floor(Math.random() * months.length)];

  if(main == false) problemlist.push([name,[quest]]);
  else{
     quest = "january";
     problemlist.push([name,[quest]]);
  }

  if(recentduplicate()) return;


  let problem = document.createElement("p");
  problem.innerHTML = quest;

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem")

  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}


function monthnumspeech(problem){

  return problem[0];

}

function monthnumtype(e){

  let input = document.getElementsByClassName("maininput")[0];

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
  return months.indexOf(problem[0])+1;
}

function monthnumvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}
