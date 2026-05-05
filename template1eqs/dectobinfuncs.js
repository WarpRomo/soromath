let dectobinpreset = {
  id: "dectobinequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: adddectobin,
  ontype: dectobintype,
  getanswer: dectobinanswer,
  validate: dectobinvalidate,
  speechText: dectobinspeech,
  name: "decimal to binary",
  settings: {
    preset: "easy",
    presets: {
      "easy": {
        range1: [0,16],
        range2: [1,5]
      },
      "medium": {
        range1: [0,32],
        range2: [1,6]
      },
      "hard": {
        range1: [0,64],
        range2: [1,7]
      },
      "custom": {}
    },
    range1: [0,16],
    range2: [1,5]
  },
  settingsgui: {
    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen("Decimal Range", "Binary Digits Range", false),
    setpreset: setpreset,
    matchpreset: matchpreset
  }
}

function randombinarydigits(range){

  let minbits = Math.max(1, Math.floor(range[0]));
  let maxbits = Math.max(minbits, Math.floor(range[1]));
  let bits = Math.floor(Math.random() * (maxbits - minbits + 1) + minbits);

  let minvalue = 0;
  let maxvalue = 1;

  if(bits > 1){
    minvalue = Math.pow(2, bits - 1);
    maxvalue = Math.pow(2, bits) - 1;
  }

  return Math.floor(Math.random() * (maxvalue - minvalue + 1) + minvalue);

}

function adddectobin(main=false, self=dectobinpreset, name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);

  if(self.settings.preset == "custom"){
    num1 = randombinarydigits(self.settings.range2);
  }

  if(main == false) problemlist.push([name, [num1]]);
  else{
    num1 = 0;
    problemlist.push([name, [num1]]);
  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = num1 + " <sub>10</sub> =";
  problem.classList.add("problem");
  problem.classList.add("binaryproblem");
  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function dectobinspeech(problem){
  return problem[0] + " in binary";
}

function dectobintype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "01";

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value = nonums;

}

function dectobinanswer(problem){
  return problem[0].toString(2);
}

function dectobinvalidate(answer, inputnumber){

  if(inputnumber.length == 0) return false;

  let parsed = parseInt(inputnumber, 2);

  if(parsed+"" == "NaN") return false;

  return parsed == parseInt(answer, 2);
}