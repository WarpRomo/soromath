let quadraticpreset = {
  id: "quadraticequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addquadratic,
  ontype: quadratictype,
  getanswer: quadraticanswer,
  validate: quadraticvalidate,
  speechText: quadraticspeech,
  name: "quadratics",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [1,1],
        range2: [-9,9]
      },
      "medium":{
        range1: [1,1],
        range2: [-12,12]
      },
      "hard":{
        range1: [-3,3],
        range2: [-9,9]
      },
      "custom":{}
    },
    range1: [1,1],
    range2: [-9,9],
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen("Coefficient Range", "Root Range"),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }
}


function addquadratic(main=false,self=quadraticpreset,name=null){

  let coeff1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);
  let coeff2 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);

  if(coeff1 == 0 && coeff2 == 0) return addquadratic(main, self, name);

  let root1 = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0]);
  let root2 = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0]);

  if(main == false) problemlist.push([name,[coeff1, coeff2, root1, root2]]);
  else{

    coeff1 = 1;
    coeff2 = 1;
    root1 = 0;
    root2 = 0;

    problemlist.push([name,[coeff1, coeff2, root1, root2]]);
  }

  if(recentduplicate()) return;


  let problem = document.createElement("p");

  let coeff = coeff1 * coeff2;
  let lincoeff = coeff1 * root2 + coeff2 * root1;
  let constant = root1 * root2;



  problem.innerHTML = `${coeff == 1 ? "" : coeff}x^2 ${lincoeff < 0 ? "-" : "+"} ${Math.abs(lincoeff) == 1 ? "" : Math.abs(lincoeff)}x ${constant < 0 ? "-" : "+"} ${Math.abs(constant)}`
  problem.classList.add("problem");
  problem.classList.add("quadraticproblem");
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

function quadraticspeech(problem){

  let coeff = problem[0] * problem[1];
  let lincoeff = problem[0] * problem[3] + problem[1] * problem[2];
  let constant = problem[2] * problem[3];

  return `${coeff == 1 ? "" : coeff} x squared ${lincoeff < 0 ? "minus" : "plus"} ${Math.abs(lincoeff) == 1 ? "" : Math.abs(lincoeff)} x ${constant < 0 ? "minus" : "plus"} ${Math.abs(constant)} `

}


function quadratictype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let allowed = "-0123456789/, "; // ahora permite espacio y coma
  let filtered = "";
  for (var i = 0; i < input.value.length; i++) {
    if (allowed.indexOf(input.value[i]) == -1) continue;
    filtered += input.value[i];
  }
  input.value = filtered;


}

function quadraticanswer(problem){
    return problem;
}

function quadraticvalidate(answer, input){

  let ans1 = -answer[2] / answer[0];
  let ans2 = -answer[3] / answer[1];

  // Accept both space or comma as separator
  let parts = input.split(/[, ]+/).map(s => s.trim()).filter(Boolean);

  // Helper to parse value (support fractions)
  function parseVal(val) {
    if (val.includes("/")) {
      let nums = val.split("/");
      if (nums.length !== 2) return NaN;
      let n = parseFloat(nums[0]);
      let d = parseFloat(nums[1]);
      if (isNaN(n) || isNaN(d) || d === 0) return NaN;
      return n / d;
    } else {
      let parsed = parseFloat(val);
      return isNaN(parsed) ? NaN : parsed;
    }
  }

  // Double root: allow single input
  if (Math.abs(ans1 - ans2) < 0.00001) {
    if (parts.length === 1) {
      let val = parseVal(parts[0]);
      if (isNaN(val)) return false;
      return Math.abs(val - ans1) < 0.00001;
    }
    if (parts.length === 2) {
      let userVals = parts.map(parseVal);
      if (userVals.some(isNaN)) return false;
      return Math.abs(userVals[0] - ans1) < 0.00001 && Math.abs(userVals[1] - ans2) < 0.00001;
    }
    return false;
  }

  // Distinct roots: require both
  if (parts.length !== 2) return false;
  let userVals = parts.map(parseVal);
  if (userVals.some(isNaN)) return false;
  let correct =
    (Math.abs(userVals[0] - ans1) < 0.00001 && Math.abs(userVals[1] - ans2) < 0.00001) ||
    (Math.abs(userVals[1] - ans1) < 0.00001 && Math.abs(userVals[0] - ans2) < 0.00001);
  return correct;

}
