function powerinit(){

  settemplate(modes[currentmode].template, modes[currentmode].settings)

  let added = ["Typeset", MathJax.Hub];

  for(var i = 0; i < 20; i++){
    added.push(addpower(i==0, (i==0 ? [0,0] : null), currentdifficulty, false));
  }

  MathJax.Hub.Typeset()


}

function addpower(main=false,setproblem=null,difficulty=0,typeset=true){

  let num1 = 0;
  let num2 = 0;

  if(difficulty == 0){
    num1 = Math.floor(Math.random() * 5) + 2
    num2 = Math.floor(Math.random() * 2) + 2;
  }
  if(difficulty == 1){
    num1 = Math.floor(Math.random() * 9) + 2
    num2 = Math.floor(Math.random() * 2) + 2;
  }
  if(difficulty == 2){
    num1 = Math.floor(Math.random() * 9) + 2
    num2 = Math.floor(Math.random() * 4) + 2;
  }


  if(setproblem == null) problemlist.push([num1,num2]);
  else{
     problemlist.push(setproblem);
     num1 = setproblem[0]
     num2 = setproblem[1]
  }

  let problem = document.createElement("p");
  problem.innerHTML = `\\[${num1}^${num2}=\\]`
  problem.classList.add("problem");
  problem.classList.add("powerproblem");

  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem

  if(typeset) MathJax.Hub.Queue(["Typeset",MathJax.Hub,problem]);

}

function powertype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;



}

function poweranswer(problem){
  console.log("YO", problem[0], problem[1]);
    return problem[0]**problem[1];
}

function powervalidate(answer, inputnumber){
  console.log(answer,inputnumber);

  return answer==parseInt(inputnumber);
}

function powerenter(e, press=false){
  validateanswer(e, powervalidate, addpower, poweranswer, press);
}
