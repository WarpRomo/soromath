function triginit(){


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
  document.getElementById("triginput").classList.add("mainproblems");

  let currentmaininput = document.getElementsByClassName("maininput")[0];
  currentmaininput.classList.remove("maininput");
  document.getElementById("triginput").classList.add("maininput");

  document.getElementById("trigproblems").style.top = "0px";
  document.getElementById("triginput").value = "";

  let currentproblems = document.getElementsByClassName("problem");

  while(currentproblems.length > 0){
    currentproblems[0].remove();
  }


  for(var i = 0; i < 20; i++){
    addtrig(i==0, (i==0 ? ["sin","0"] : null));
  }

}

function addtrig(main=false,setproblem=null,difficulty=0){

  let funcs = ["sin","cos","tan"];
  let angles = ["0.5pi", "1pi", "1.5pi"]

  let func = funcs[Math.floor(Math.random() * funcs.length)];
  let angle = angles[Math.floor(Math.random() * angles.length)];

  if(setproblem == null) problemlist.push([func,angle]);
  else{
     problemlist.push(setproblem);
     func = setproblem[0]
     angle = setproblem[1]
  }


  let problem = document.createElement("p");
  problem.innerHTML = `${func}(${angle})`;
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("trigproblems");
  problems.appendChild(problem);

}

function trigtype(e){

  let input = document.getElementById("triginput")

  let nonums = "";
  let nums = "-0123456789sqrt()./inf"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function triganswer(problem){

  let constant = problem[1].replace("pi", "*Math.PI")

  console.log(`Math.${problem[0]}(${constant})`);

  let answer = eval(`Math.${problem[0]}(${constant})`);

  console.log("le answer", answer);

  if(Math.abs(answer) > 1000) answer = (Math.abs(answer) / answer) * 1000

  return answer;

}

function trigvalidate(answer, input){

  input = input.replace("sqrt", "Math.sqrt");

  let inputnumber = null

  if(input.startsWith("inf")){
    inputnumber = 1000;
  }
  else if(input.startsWith("-inf")){
    inputnumber = -1000
  }
  else{
    try{
      inputnumber = eval(input);
    }
    catch(err){
      inputnumber = null
    }
  }

  let dist = Math.abs(answer - inputnumber)

  return dist < 0.02;


}

function trigenter(e){

  validateanswer(e, trigvalidate, addtrig, triganswer, "triginput", "trigproblems");

}
