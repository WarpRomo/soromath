
function addpower(setproblem=null,difficulty=0,name=null){

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


  if(main == false) problemlist.push([name,[num1,num2]]);
  else{

    num1 = 0;
    num2 = 0;
    problemlist.push([name,[num1, num2]]);

  }

  let problem = document.createElement("p");
  problem.innerHTML = `${num1}^${num2}=`
  problem.classList.add("problem");
  problem.classList.add("powerproblem");

  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  console.log(problem);



  const macros = {};

  katex.render(problem.innerHTML, problem, {
    throwOnError: false,
    macros
  });


  return problem;



}

function powerspeech(problem){

  return problem[0] + " to the power of " + problem[1];

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
