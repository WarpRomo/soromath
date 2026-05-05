let centurykeypreset = {
  id: "centurykeyequation",
  template: "template1equation",
  addproblem: addcenturykey,
  ontype: centurykeytype,
  getanswer: centurykeyanswer,
  validate: centurykeyvalidate,
  speechText: centurykeyspeech,
  name: "day of week [century key]",
  settings: {
    name: "centurykey"
  }
}

const centurykeylabels = ["16xx", "17xx", "18xx", "19xx", "20xx", "21xx"];
const centurykeyvalues = [6, 4, 2, 0, 6, 4];

function addcenturykey(main=false, self=centurykeypreset, name=null){

  let centuryindex = Math.floor(Math.random() * centurykeylabels.length);

  if(main){
    centuryindex = 3;
  }

  problemlist.push([name, [centuryindex]]);

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = centurykeylabels[centuryindex];

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");

  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function centurykeyspeech(problem){
  const speechMap = {
    0: "mil seiscientos equis equis",
    1: "mil setecientos equis equis",
    2: "mil ochocientos equis equis",
    3: "mil novecientos equis equis",
    4: "dos mil equis equis",
    5: "dos mil cien equis equis"
  };
  return speechMap[problem[0]];
}

function centurykeytype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789";

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value = nonums;

}

function centurykeyanswer(problem){
  return centurykeyvalues[problem[0]];
}

function centurykeyvalidate(answer, inputnumber){
  if(inputnumber.length == 0) return false;
  if(inputnumber.length > 1) return "fail";
  if(answer == parseInt(inputnumber)) return true;
  return "fail";
}
