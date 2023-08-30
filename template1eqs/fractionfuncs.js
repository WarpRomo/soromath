
let fractionpreset = {
  id: "fractionequation",
  template: "template1equation",
  addproblem: addfraction,
  ontype: fractiontype,
  getanswer: fractionanswer,
  validate: fractionvalidate,
  speechText: fractionspeech,
  settings: {
    name: "fraction",
    offset: "-109px"
  }
}

function addfraction(main=false,difficulty=0,name=null){


  let frac1 = [Math.floor(Math.random() * 8) + 2, Math.floor(Math.random() * 8) + 2]
  let frac2 = [Math.floor(Math.random() * 8) + 2, Math.floor(Math.random() * 8) + 2]





  if(main == false) problemlist.push([name, [frac1, frac2]]);
  else{

    frac1 = [1,2]
    frac2 = [1,2]

    problemlist.push([name, [frac1, frac2]]);

  }

  if(recentduplicate()) return;


  let problem = document.createElement("p");

  problem.innerHTML = `\\frac${frac1[0]}${frac1[1]}+\\frac${frac2[0]}${frac2[1]}`;
  problem.classList.add("problem");
  problem.classList.add("fractionproblem");


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

function fractionspeech(problem){

  let frac1 = problem[0];
  let frac2 = problem[1];

  return frac1[0] + " over " + frac1[1] + " plus " + frac2[0] + " over " + frac2[1];

}


function fractiontype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789sqrt()./inf"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function fractionanswer(problem){

  return (problem[0][0]/problem[0][1] + problem[1][0]/problem[1][1]);

}

function fractionvalidate(answer, input){

  let value = null;

  if(input.includes("/")){

    input = input.split("/");

    if(input.length != 2){
      value = null;
    }
    else{

      if(parseInt(input[0])+"" != "NaN" && parseInt(input[1])+"" != "NaN"){
        value = parseInt(input[0]) / parseInt(input[1]);
      }

    }

  }
  else{
    let parsed = parseFloat(input);

    if(parsed+"" != "NaN"){
      value = parsed;
    }
  }

  if(value == null) return false;
  else return Math.abs(answer - value) < 0.00001
  return false;

}

function fractionenter(e, press=false){

  validateanswer(e, fractionvalidate, addfraction, fractionanswer, press, scrollamount=100);

}
