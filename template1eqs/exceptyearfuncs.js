let exceptyearpreset = {
  id: "exceptyearequation",
  template: "template1equation",
  addproblem: addexceptyear,
  ontype: exceptyeartype,
  getanswer: exceptyearanswer,
  validate: exceptyearvalidate,
  answerText: exceptyearanswertext,
  speechText: exceptyearspeech,
  name: "day of week [except year]",
  settings: {
    name: "exceptyear"
  }
}

let exceptyearmonths = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const exceptyearmaxdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const exceptyearmonthkeys = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];

function addexceptyear(main=false, self=exceptyearpreset, name=null){
  let monthIndex = Math.floor(Math.random() * exceptyearmonths.length);
  let day = Math.floor(Math.random() * exceptyearmaxdays[monthIndex]) + 1;
  if(main){
    day = 7;
    monthIndex = 0;
  }
  let month = exceptyearmonths[monthIndex];
  problemlist.push([name, [day, monthIndex]]);
  if(recentduplicate()) return;
  let problem = document.createElement("p");
  problem.innerHTML = day + " de " + month;
  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");
  if(main) problem.id = "mainproblem";
  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);
  return problem;
}

function exceptyearspeech(problem){
  return problem[0] + " " + exceptyearmonths[problem[1]];
}

function exceptyearanswer(problem){
  let day = problem[0];
  let monthKey = exceptyearmonthkeys[problem[1]];
  return (day % 7 + monthKey) % 7;
}

function exceptyearanswertext(answer, problem){
  return problem[0]%7 + " +  " + exceptyearmonthkeys[problem[1]] + " = " + answer;
}

function exceptyeartype(e){
  let input = document.getElementsByClassName("maininput")[0];
  let filtered = "";
  let nums = "0123456789";
  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    filtered += input.value[i];
  }
  input.value = filtered;
}

function exceptyearvalidate(answer, inputnumber){
  if(inputnumber.length == 0) return false;
  if(inputnumber.length > 1) return "fail";
  let parsed = parseInt(inputnumber);
  if(parsed + "" == "NaN") return "fail";
  if(answer == parsed) return true;
  return "fail";
}
