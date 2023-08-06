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
    addtrig(i==0, (i==0 ? ["sin",[0]] : null));
  }

}

function addtrig(main=false,setproblem=null,difficulty=0){

  let funcs = ["sin","cos","tan"];
  let angles = [[0],[1,2],[1],[3,2],[1,6],[1,3],[2,3],[5,6],[7,6],[4,3],[5,3],[11,6]]

  let func = funcs[Math.floor(Math.random() * funcs.length)];
  let angle = angles[Math.floor(Math.random() * angles.length)];

  if(setproblem == null) problemlist.push([func,angle]);
  else{
     problemlist.push(setproblem);
     func = setproblem[0]
     angle = setproblem[1]
  }


  let problem = document.createElement("p");

  if(angle.length == 2){
    problem.innerHTML = `\\[\\${func}(\\frac{${angle[0]}{\\pi}}{${angle[1]}})\\]`;
  }
  if(angle.length == 1){
    problem.innerHTML = `\\[\\${func}(${angle[0]}{\\pi})\\]`;
  }

  problem.classList.add("problem");
  problem.classList.add("trigproblem");

  if(main) problem.id = "mainproblem"

  let problems = document.getElementById("trigproblems");
  problems.appendChild(problem);




  MathJax.Hub.Config({
    displayAlign: "right",
    displayIndent: "0em"
  })
  MathJax.Hub.Typeset(problem);
  
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

  let constant = (problem[1][0] / (problem[1].length > 1 ? problem[1][1] : 1)) * Math.PI;

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

function trigenter(e, press=false){

  validateanswer(e, trigvalidate, addtrig, triganswer, "triginput", "trigproblems", press, scrollamount=100);

}
