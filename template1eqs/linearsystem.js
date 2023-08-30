
let linearpreset = {
  id: "linearequations",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addlinear,
  ontype: lineartype,
  getanswer: linearanswer,
  validate: linearvalidate,
  speechText: linearspeech,
  name: "linear equations",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [0,9],
        range2: [0,9]
      },
      "medium":{
        range1: [0,99],
        range2: [0,99]
      },
      "hard":{
        range1: [0,999],
        range2: [0,999]
      },
      "custom":{}
    },
    range1: [0,9],
    range2: [0,9],
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen("Coefficient Range", "Constant Range"),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }

}

function addlinear(main=false,self=linearpreset,name=null){

  let num1 = null;
  let num2 = null;
  let num3 = null;
  let num4 = null;

  problemarr = [];

  if(main == false){

    problemarr = ["","","",""];

    problemarr[Math.floor(Math.random() * problemarr.length)]+="x";

    while(true){
      let rand = Math.floor(Math.random() * problemarr.length);
      if(problemarr[rand].length == 0){
        problemarr[rand]+="x"
        break;
      }
    }

    for(var i = 0; i < problemarr.length; i++){
      if(problemarr[i] == "x"){
        problemarr[i] = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0])+"x";
      }
      else{
        problemarr[i] = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0])+"";
      }
    }

    for(var i = 0; i < 2; i++){
      if(!problemarr[i].includes("x")) continue;
      for(var j = 2; j < 4;j ++){
        if(problemarr[j] == problemarr[i]){
          return addlinear(main,linearpreset,name)
        }
      }
    }



    problemlist.push([name,problemarr]);
  }
  else{

    num1 = 1;
    num2 = 0;
    num3 = 0;
    num4 = 0;

    problemarr = [num1+"x",num2+"",num3+"",num4+""]

    problemlist.push([name,problemarr]);

  }

  if(recentduplicate()) return;


  let problem = document.createElement("p");

  let part1 = problemarr[0];

  if(problemarr[1] < 0) part1 += " - " + Math.abs(problemarr[1]);
  else part1 += " + " + problemarr[1];

  part1 += " = " + problemarr[2];

  if(problemarr[3] < 0) part1 += " - " + Math.abs(problemarr[3]);
  else part1 += " + " + problemarr[3];

  problem.innerHTML = part1;
  problem.classList.add("problem");

  if(main) problem.id = "mainproblem"

  problem.classList.add("linearproblem")

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);



  return problem;

}

function linearspeech(problem){

  let clone = [...problem]

  clone[0] = clone[0] < 0 ? ("negative " + clone[0]) : clone[0];
  clone[2] = clone[2] < 0 ? ("negative " + clone[2]) : clone[2];

  clone[1] = clone[1] < 0 ? ("minus " + clone[1]) : ("plus " + clone[1]);
  clone[3] = clone[3] < 0 ? ("minus " + clone[3]) : ("plus " + clone[3]);

  let full = clone[0] + " " + clone[1] + " equals " + clone[2] + " " + clone[3];

  return full;

}

function lineartype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789/"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;

}

function linearanswer(problem){

  let coeff = 0;
  let constant = 0;

  let clone = [problem[0]+"",problem[1]+"",problem[2]+"",problem[3]+""]


  for(var i = 0; i < clone.length; i++){

    let num = parseInt(clone[i].replace("x", ""));

    if(i > 1) num = -num;
    if(clone[i].includes("x")) coeff += num;
    else constant += num;

  }

  return constant / -coeff;
}

function linearvalidate(answer, inputnumber){

  let input = inputnumber+"";

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
