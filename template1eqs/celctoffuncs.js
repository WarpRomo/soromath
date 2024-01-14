
let celctofpreset = {
  id: "celctofequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addcelctof,
  ontype: celctoftype,
  getanswer: celctofanswer,
  validate: celctofvalidate,
  speechText: celctofspeech,
  name: "°C to °F",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [0,100],
        range2: [-1,1]
      },
      "medium":{
        range1: [0,200],
        range2: [-0.5,0.5]
      },
      "hard":{
        range1: [0,300],
        range2: [-0.1,0.1]
      },
      "custom":{}
    },
    range1: [0,100],
    range2: [-1,1],
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen("°C range", "Error Range", false, true),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }
}


function addcelctof(main=false,self=celctofpreset,name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);

  if(main == false) problemlist.push([name, [num1]]);
  else{
    num1 = 0
    problemlist.push([name, [num1]]);
  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = num1 + " °C";
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function celctofspeech(problem){

  return problem[0] + " degrees celsius"


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
    return (9/5) * (problem[0]) + 32;
}

function celctofvalidate(answer, inputnumber){
  let input = parseFloat(inputnumber);
  let distance = answer - input;

  console.log(distance);

  return distance < celctofpreset.settings.range2[1] && distance > celctofpreset.settings.range2[0]
}
