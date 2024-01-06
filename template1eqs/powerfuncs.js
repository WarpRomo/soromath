
let powerpreset = {
  id: "powerequation",
  template: "template1equation",
  addproblem: addpower,
  ontype: powertype,
  getanswer: poweranswer,
  validate: powervalidate,
  speechText: powerspeech,
  name: "exponents",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [2,5],
        range2: [1,3],
        range3: []
      },
      "medium":{
        range1: [2,9],
        range2: [1,4],
        range3: []
      },
      "hard":{
        range1: [2,9],
        range2: [1,5],
        range3: []
      },
      "custom":{}
    },
    range1: [2,5],
    range2: [1,3],
    range3: []
  },
  settingsgui: {

    range1: null,
    range2: null,
    range3: null,
    doneinit: false,
    init: basicpresetgen("Base", "Exponent", "Variable Range"),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }
}

function addpower(main=false,self=powerpreset,name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);
  let num2 = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0]);

  if(self.settings.range3 != undefined && self.settings.range3.length != 0){

    let range = self.settings.range3;

    let val = Math.floor( Math.floor( Math.random() * range.length ) / 4 ) * 4;

    num1 = Math.floor(Math.random() * (range[val+1] - range[val] + 1) + range[val] );
    num2 = Math.floor(Math.random() * (range[val+3] - range[val+2] + 1) + range[val+2] );

  }

  if(main == false) problemlist.push([name,[num1,num2]]);
  else{

    num1 = 0;
    num2 = 0;
    problemlist.push([name,[num1, num2]]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = `${num1}^{${num2}}=`
  problem.classList.add("problem");
  problem.classList.add("powerproblem");

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

function powerspeech(problem){

  return (problem[0] < 0 ? "negative " : "") + Math.abs(problem[0]) + " to the power of " + (problem[1] < 0 ? "negative " : "") + Math.abs(problem[1]);

}


function powertype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789"

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
