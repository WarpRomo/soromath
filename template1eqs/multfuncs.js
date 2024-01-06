let multpreset = {
  id: "multequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addmult,
  ontype: multtype,
  getanswer: multanswer,
  validate: multvalidate,
  speechText: multspeech,
  name: "multiplication",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [1,9],
        range2: [1,9],
        range3: []
      },
      "medium":{
        range1: [10,99],
        range2: [10,99],
        range3: []
      },
      "hard":{
        range1: [100,999],
        range2: [100,999],
        range3: []
      },
      "custom":{}
    },
    range1: [1,9],
    range2: [1,9],
    range3: []
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen("Number Range 1", "Number Range 2", "Variable Range"),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }

}


function addmult(main=false,self=multpreset,name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);
  let num2 = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0]);

  if(self.settings.range3 != undefined && self.settings.range3.length != 0){

    let range = self.settings.range3;

    let val = Math.floor( Math.floor( Math.random() * range.length ) / 4 ) * 4;

    num1 = Math.floor(Math.random() * (range[val+1] - range[val] + 1) + range[val] );
    num2 = Math.floor(Math.random() * (range[val+3] - range[val+2] + 1) + range[val+2] );

  }

  if(main == false) problemlist.push([name, [num1,num2]]);
  else{
     num1 = 1
     num2 = 1
     problemlist.push([name, [num1,num2]]);
  }

  if(recentduplicate()) return;


  let problem = document.createElement("p");
  problem.innerHTML = num1 + "×" + num2 + " " + "="
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function multspeech(problem){

  return (problem[0] < 0 ? "negative " : "") + Math.abs(problem[0]) + " times " + (problem[1] < 0 ? "negative " : "") + Math.abs(problem[1]);

}

function multtype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function multanswer(problem){
    return problem[0]*problem[1];
}

function multvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}
