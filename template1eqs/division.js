function adddivision(main=false,difficulty=0,name=null){

  let num1 = 0;
  let num2 = 0;

  if(difficulty == 0){
    num2 = Math.floor(Math.random() * 9) + 1;
    num1 = num2 * Math.floor(Math.random() * 10);
  }
  if(difficulty == 1){
    num2 = Math.floor(Math.random() * 9) + 1;
    num1 = num2 * Math.floor(Math.random() * 90) + 10;
  }
  if(difficulty == 2){
    num2 = Math.floor(Math.random() * 99) + 1;
    num1 = num2 * Math.floor(Math.random() * 90) + 10;
  }


  if(main == false) problemlist.push([name,[num1,num2]]);
  else{
    num1 = 1
    num2 = 1
    problemlist.push([name,[num1,num2]]);
  }


  let problem = document.createElement("p");
  problem.innerHTML = num1 + "/" + num2 + " " + "="
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function divisiontype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function divisionanswer(problem){
    return problem[0]/problem[1];
}

function divisionvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}
