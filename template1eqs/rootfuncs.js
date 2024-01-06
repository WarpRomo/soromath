
let rootpreset = {
  id: "rootequation",
  template: "template1equation",
  addproblem: addroot,
  ontype: roottype,
  getanswer: rootanswer,
  validate: rootvalidate,
  speechText: rootspeech,
  name: "Nth Roots",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [2,3],
        range2: [2,9],
        range3: []
      },
      "medium":{
        range1: [2,4],
        range2: [2,9],
        range3: []
      },
      "hard":{
        range1: [2,6],
        range2: [2,9],
        range3: []
      },
      "custom":{}
    },
    range1: [2,3],
    range2: [2,9],
    range3: []
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen("Root", "Answer", "Variable Range"),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }
}

function addroot(main=false,self=rootpreset,name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);
  let num2 = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0]);

  if(self.settings.range3 != undefined && self.settings.range3.length != 0){

    let range = self.settings.range3;

    let val = Math.floor( Math.floor( Math.random() * range.length ) / 4 ) * 4;

    num1 = Math.floor(Math.random() * (range[val+1] - range[val] + 1) + range[val] );
    num2 = Math.floor(Math.random() * (range[val+3] - range[val+2] + 1) + range[val+2] );

  }

  num2 = num2 ** num1;

  if(main == false) problemlist.push([name,[num1,num2]]);
  else{

    num1 = 1;
    num2 = 1;
    problemlist.push([name,[num1, num2]]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = `\\sqrt[${num1}]{${num2}}`
  problem.classList.add("problem");
  problem.classList.add("rootproblem");

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

function rootspeech(problem){

  let rootpart = problem[0];
  let wordending = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"]

  let stringed = rootpart+"";

  rootpart += wordending[parseInt(stringed[stringed.length-1])] + " root"

  if(problem[0] == 1) rootpart = "first root"
  if(problem[0] == 2) rootpart = "square root"
  if(problem[0] == 3) rootpart = "cube root"

  return rootpart + " of " + problem[1];

}


function roottype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789."

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;



}

function rootanswer(problem){
  console.log("YO", problem[0], problem[1]);
    return problem[1]**(1/problem[0]);
}

function rootvalidate(answer, inputnumber){
  console.log(answer,inputnumber);

  let parsed = parseFloat(inputnumber);

  if(parsed+"" == "NaN") return false;

  let dist = 0.01;

  return Math.abs(answer - parsed) < dist;
}

function rootenter(e, press=false){
  validateanswer(e, rootvalidate, addroot, rootanswer, press);
}
