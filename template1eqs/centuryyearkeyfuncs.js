let centuryyearkeypreset = {
  id: "centuryyearkeyequation",
  template: "template1equation",
  addproblem: addcenturyyearkey,
  ontype: centuryyearkeytype,
  getanswer: centuryyearkeyanswer,
  validate: centuryyearkeyvalidate,
  speechText: centuryyearkeyspeech,
  name: "day of week [century+year key]",
  answerText: function(answer, problem) {
    let year = problem[0];
    let century = Math.floor(year / 100);
    let yearpart = year % 100;
    let centurykey = (6 - 2 * (century % 4) + 7) % 7;
    let yearkey = (yearpart + Math.floor(yearpart / 4)) % 7;
    let sum = (centurykey + yearkey) % 7;
    return `${centurykey} + ${yearkey} = ${sum}`;
  },
  settings: {
    preset: "easy",
    presets: {
      "easy":  { range1: [1900, 2100] },
      "medium":{ range1: [1800, 2200] },
      "hard":  { range1: [1600, 2400] },
      "custom":{}
    },
    range1: [1900, 2100]
  },
  settingsgui: {
    range1: null,
    doneinit: false,
    init: basicpresetgenyear("Year Range"),
    setpreset: setpresetyear,
    matchpreset: matchpreset
  }
}

function addcenturyyearkey(main=false, self=centuryyearkeypreset, name=null){

  let year = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1)) + self.settings.range1[0];

  if(main){
    year = 1906;
  }

  problemlist.push([name, [year]]);

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = year;

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");

  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function centuryyearkeyspeech(problem){
  return problem[0];
}

function centuryyearkeytype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let filtered = "";
  let nums = "0123456789";

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    filtered += input.value[i];
  }

  input.value = filtered;

}

function centuryyearkeyanswer(problem){
  let year = problem[0];
  let century = Math.floor(year / 100);
  let yearpart = year % 100;
  let centurykey = 6 - 2 * (century % 4);
  let yearkey = yearpart + Math.floor(yearpart / 4);

  return (centurykey + yearkey) % 7;
}

function centuryyearkeyvalidate(answer, inputnumber){
  if(inputnumber.length == 0) return false;
  if(inputnumber.length > 1) return "fail";

  let parsed = parseInt(inputnumber);
  if(parsed + "" == "NaN") return "fail";

  if(answer == parsed) return true;
  return "fail";
}
