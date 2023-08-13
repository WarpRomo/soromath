
function addcelctof(main=false,difficulty=null,name=null){


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



  if(main == false) problemlist.push([name,[num]]);
  else{
     num = 0;
     problemlist.push([name,[num]]);
  }


  let problem = document.createElement("p");
  problem.innerHTML = num + "°C"
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function celctofspeech(problem){

  return problem[0] + " degrees"


}

function celctoftype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789."

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function celctofanswer(problem){
    return problem * 9/5 + 32
}

function celctofvalidate(answer, inputnumber){
  return answer==parseFloat(inputnumber);
}
