let exceptdaypreset = {
  id: "exceptdayequation",
  template: "template1equation",
  addproblem: addexceptday,
  ontype: calendartype,
  getanswer: exceptdayanswer,
  validate: calendarvalidate,
  answerText: exceptdayanswertext,
  speechText: exceptdayspeech,
  name: "day of week [except day]",
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

function addexceptday(main=false, self=exceptdaypreset, name=null){

  let monthindex = Math.floor(Math.random() * monthkeymonths.length);
  let year = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1)) + self.settings.range1[0];

  if(main){
    monthindex = 0;
    year = 2001;
  }

  problemlist.push([name, [monthindex, year]]);

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = calendarformatmonthyear(monthindex, year);

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");

  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function exceptdayspeech(problem){
  return calendarformatmonthyear(problem[0], problem[1]);
}

function exceptdayanswer(problem){
  let previousMonthLastDay = new Date(problem[1], problem[0], 0);
  let day = previousMonthLastDay.getDay() - 1;

  if(day < 0) day = 6;

  return day;
}

function exceptdayanswertext(answer, problem){
  return calendarexceptdayanswertext(answer, problem[0], problem[1]);
}
