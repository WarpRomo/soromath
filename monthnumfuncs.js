function monthnuminit(){

  settemplate(modes[currentmode].template, modes[currentmode].settings)

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

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

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
  return months.indexOf(problem)+1;
}

function monthnumvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}

function monthnumenter(e, press=false){
  validateanswer(e, monthnumvalidate, addmonthnum, monthnumanswer, press);
}
