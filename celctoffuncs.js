function celctofinit(){


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
  document.getElementById("celctofinput").classList.add("mainproblems");

  let currentmaininput = document.getElementsByClassName("maininput")[0];
  currentmaininput.classList.remove("maininput");
  document.getElementById("celctofinput").classList.add("maininput");

  document.getElementById("celctofproblems").style.top = "0px";
  document.getElementById("celctofinput").value = "";

  let currentproblems = document.getElementsByClassName("problem");

  while(currentproblems.length > 0){
    currentproblems[0].remove();
  }


  for(var i = 0; i < 20; i++){
    addcelctof(i==0, (i==0 ? 0 : null), currentdifficulty);
  }

}

function addcelctof(main=false,setproblem=null,difficulty){


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



  if(setproblem == null) problemlist.push(num);
  else{
     problemlist.push(setproblem);
     num = setproblem
  }


  let problem = document.createElement("p");
  problem.innerHTML = num + "°C"
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("celctofproblems");
  problems.appendChild(problem);

}

function celctoftype(e){

  let input = document.getElementById("celctofinput")

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

function celctofenter(e){
  validateanswer(e, celctofvalidate, addcelctof, celctofanswer, "celctofinput", "celctofproblems");
}
