let monthkeypreset = {
  id: "monthkeyequation",
  template: "template1equation",
  addproblem: addmonthkey,
  ontype: monthkeytype,
  getanswer: monthkeyanswer,
  validate: monthkeyvalidate,
  speechText: monthkeyspeech,
  name: "day of week [month key]",
  settings: {
    name: "monthkey"
  }
}

const monthkeymonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

const monthkeyvalues = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];

function addmonthkey(main=false, self=monthkeypreset, name=null){

  let monthindex = Math.floor(Math.random() * monthkeymonths.length);

  if(main){
    monthindex = 0;
  }

  problemlist.push([name, [monthindex]]);

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = calendarformatmonth(monthindex);

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");

  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function monthkeyspeech(problem){
  return calendarformatmonth(problem[0]);
}

function monthkeytype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789";

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value = nonums;

}

function monthkeyanswer(problem){
  return monthkeyvalues[problem[0]];
}

function monthkeyvalidate(answer, inputnumber){
  if(inputnumber.length == 0) return false;
  if(inputnumber.length > 1) return "fail";
  if(answer == parseInt(inputnumber)) return true;
  return "fail";
}
