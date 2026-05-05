let bintodecpreset = {
  id: "bintodecequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addbintodec,
  ontype: bintodectype,
  getanswer: bintodecanswer,
  validate: bintodecvalidate,
  speechText: bintodecspeech,
  name: "binary to decimal",
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

function randombinarydigitsdec(range){

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

function addbintodec(main=false, self=bintodecpreset, name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);

  if(self.settings.preset == "custom"){
    num1 = randombinarydigitsdec(self.settings.range2);
  }

  if(main == false) problemlist.push([name, [num1]]);
  else{
    num1 = 0;
    problemlist.push([name, [num1]]);
  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = num1.toString(2) + " <sub>2</sub> =";
  problem.classList.add("problem");
  problem.classList.add("binaryproblem");
  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function bintodecspeech(problem){
  return "binario a decimal" + problem[0].toString(2).split("").map((digit) => digit == "0" ? "zero" : "one").join(" ");
}

function bintodectype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789";

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value = nonums;

}

function bintodecanswer(problem){
  return problem[0];
}

function bintodecvalidate(answer, inputnumber){

  if(inputnumber.length == 0) return false;

  let parsed = parseInt(inputnumber);

  if(parsed+"" == "NaN") return false;

  return parsed == answer;
}