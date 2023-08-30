
let trigpreset = {
  id: "trigequation",
  template: "template1equation",
  addproblem: addtrig,
  ontype: trigtype,
  getanswer: triganswer,
  validate: trigvalidate,
  speechText: trigspeech,
  settings: {
    name: "trig",
    offset: "-109px"
  }
}

function addtrig(main=false,difficulty=0,name=null){

  let funcs = ["sin","cos","tan"];
  let angles = [[0],[1,2],[1],[3,2],[1,6],[1,3],[2,3],[5,6],[7,6],[4,3],[5,3],[11,6]]

  let func = funcs[Math.floor(Math.random() * funcs.length)];
  let angle = angles[Math.floor(Math.random() * angles.length)];

  if(main == false) problemlist.push([name,[func,angle]]);
  else{

    func = funcs[0];
    angle = angles[0]

    problemlist.push([name,[func,angle]]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");

  if(angle.length == 2){
    problem.innerHTML = `\\${func}(\\frac{${angle[0]}{\\pi}}{${angle[1]}})`;
  }
  if(angle.length == 1){
    problem.innerHTML = `\\${func}(${angle[0]}{\\pi})`;
  }

  problem.classList.add("problem");
  problem.classList.add("trigproblem");


  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  const macros = {};

  katex.render(problem.innerHTML, problem, {
    throwOnError: false,
    macros
  });

  return problem;

}

function trigspeech(problem){

  let func = problem[0];
  let fraction = problem[1];

  let functionstring = "";

  if(func == "sin") functionstring = "sign";
  if(func == "cos") functionstring = "co-sign";
  if(func = "tan") functionstring = "tan";

  return functionstring + " of " + fraction[0] + " pie over " + fraction[1];

}


function trigtype(e){

  let input = document.getElementsByClassName("maininput")[0];

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

  validateanswer(e, trigvalidate, addtrig, triganswer, press, scrollamount=100);

}
