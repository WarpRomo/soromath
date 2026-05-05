let yearkeypreset = {
  id: "yearkeyequation",
  template: "template1equation",
  addproblem: addyearkey,
  ontype: yearkeytype,
  getanswer: yearkeyanswer,
  validate: yearkeyvalidate,
  speechText: yearkeyspeech,
  name: "day of week [Year key]",
  settings: {
    preset: "easy",
    presets: {
      "easy": { range1: [0, 28] },
      "medium": { range1: [0, 56] },
      "hard": { range1: [0, 99] },
      "custom": {}
    },
    range1: [0, 28]
  },
  settingsgui: {
    range1: null,
    doneinit: false,
    init: basicpresetgenyear("Year Range"),
    setpreset: setpresetyear,
    matchpreset: matchpreset
  }
}

function formatyearkeyyear(year){
  return year.toString().padStart(2, "0");
}

function addyearkey(main=false, self=yearkeypreset, name=null){

  let year = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1)) + self.settings.range1[0];

  if(main){
    year = 0;
  }

  problemlist.push([name, [year]]);

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = "xx" + formatyearkeyyear(year);

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");

  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function yearkeyspeech(problem){
  return "Año " + formatyearkeyyear(problem[0]);
}

function yearkeytype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let filtered = "";
  let nums = "0123456789";

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    filtered += input.value[i];
  }

  input.value = filtered;

}

function yearkeyanswer(problem){
  let year = problem[0];
  return (year + Math.floor(year / 4)) % 7;
}

function yearkeyvalidate(answer, inputnumber){
  if(inputnumber.length == 0) return false;
  if(inputnumber.length > 1) return "fail";

  let parsed = parseInt(inputnumber);
  if(parsed + "" == "NaN") return "fail";

  if(answer == parsed) return true;
  return "fail";
}
