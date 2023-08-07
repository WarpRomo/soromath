
function addaddition(main=false,difficulty=0,name=null){

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


  if(main == false) problemlist.push([name,[num1,num2]]);
  else{

    num1 = 0;
    num2 = 0;

    problemlist.push([name,[num1, num2]]);

  }


  let problem = document.createElement("p");
  problem.innerHTML = num1 + "+" + num2 + " " + "="
  problem.classList.add("problem");

  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function additiontype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;

}

function additionanswer(problem){
    return problem[0]+problem[1];
}

function additionvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}
