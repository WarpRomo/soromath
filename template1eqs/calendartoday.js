
let calendarpreset = {
  id: "calendarday",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addcalendar,
  ontype: calendartype,
  getanswer: calendaranswer,
  validate: calendarvalidate,
  speechText: calendarspeech,
  name: "date to day of week",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [0,8999942400000]
      },
      "hard":{
        range1: [-9000028800000,9000000000000]
      },
      "custom":{}
    },
    range1: [0,8999942400000]
  },
  settingsgui: {

    range1: null,
    doneinit: false,
    init: basicpresetgendate("Date Range"),
    setpreset: setpresetdate,
    matchpreset: matchpreset,

  }

}


function basicpresetgendate(range1label){
  return (self, changegui=true) => {basicpresetdate(self, range1label, changegui)}
}

function basicpresetdate(self, range1label, changegui){
  let modesettingsbutton = document.getElementById("modesettingsbutton")
  let modesettingssection = document.getElementById("modesettingssection");

  if(!changegui){
    modesettingsbutton = document.createElement("div");
    modesettingssection = document.createElement("div");
  }

  let presetLabel = document.createElement("p");
  presetLabel.innerHTML = "&nbsp;";
  presetLabel.classList.add("settinglabel");

  modesettingssection.appendChild(presetLabel);

  let radioPresets = ["easy","hard", "custom"]

  let radioButtons = document.createElement("div");

  radioButtons.style.display = "flex";
  radioButtons.style.flexDirection = "column";
  radioButtons.style.width = "200px";
  radioButtons.style.marginLeft = "auto";
  radioButtons.style.marginRight = "auto";
  radioButtons.style.position = "relative";
  radioButtons.style.left = "45px";

  for(var i = 0; i < radioPresets.length; i++){

    let num = i;
    let radioParent = document.createElement("div");

    radioParent.style.display = "flex";
    radioParent.style.width = "200px";
    radioParent.style.alignItems = "center"
    radioParent.classList.add("radiosettingparent")

    let radio = document.createElement("input");
    radio.setAttribute("type", "radio")
    radio.setAttribute("name", "difficulty")
    radio.id = radioPresets[i] + "presetsettings"
    radio.classList.add("radiosetting");

    self.settings.presets[radioPresets[i]].button = radio;

    if(radioPresets[i] == self.settings.preset){
      radio.checked = true;
    }

    radioParent.appendChild(radio);

    let radioLabel = document.createElement("p");
    //radioLabel.setAttribute("for", radioPresets[i] + "presetsettings");
    radioLabel.innerHTML = radioPresets[i];
    radioParent.appendChild(radioLabel);
    radioButtons.appendChild(radioParent);
    radioLabel.classList.add("radiolabel");


    if(radioPresets[i] != "custom"){

      radio.onclick = () => {

        self.settingsgui.setpreset(self, radioPresets[num])
      }

    }
    else{
      radio.classList.add("radiosettingdisabled");
      radio.disabled = true;
    }


  }

  if(self.settings.preset != "custom"){
    self.settings.presets["custom"].button.parentElement.style.opacity = 0.2;
  }

  modesettingssection.appendChild(radioButtons);

  let numRange = document.createElement("p");
  numRange.innerHTML = range1label;
  numRange.classList.add("settinglabel");
  numRange.style.marginTop = "20px";

  function makeinputrange(){

    let parent = document.createElement("div");
    parent.style.display = "flex";
    parent.style.justifyContent = "center"

    let input1 = document.createElement("input")
    let input2 = document.createElement("input")

    input1.setAttribute("type", "date");
    input2.setAttribute("type", "date");

    input1.style.margin = "7px";
    input2.style.margin = "7px";

    input1.classList.add("dateinput");
    input2.classList.add("dateinput");

    parent.appendChild(input1);
    parent.appendChild(input2);

    return [parent, input1, input2];

  }

  let range1 = makeinputrange();

  range1[1].valueAsNumber = self.settings.range1[0];
  range1[2].valueAsNumber = self.settings.range1[1];

  range1[1].oninput = () => { oninput(range1[1]) }
  range1[2].oninput = () => { oninput(range1[2]) }
  range1[1].onblur = () => {onblur(range1[1]); swap(range1[1], range1[2]); self.settings.range1[0] = range1[1].valueAsNumber; self.settings.range1[1] = range1[2].valueAsNumber; self.settingsgui.matchpreset(self) }
  range1[2].onblur = () => {onblur(range1[2]); swap(range1[1], range1[2]); self.settings.range1[1] = range1[2].valueAsNumber; self.settings.range1[0] = range1[1].valueAsNumber; self.settingsgui.matchpreset(self) }
  self.settingsgui.range1 = range1;

  modesettingssection.appendChild(numRange);
  modesettingssection.appendChild(range1[0])

  function oninput(input){
    return input.valueAsNumber;
  }
  function onblur(input){

    if(input.valueAsNumber+"" == "NaN"){
      input.valueAsNumber = 0;
    }

    return input.valueAsNumber;
  }

  function swap(e1, e2){

    console.log("perform swap");
    console.log(e1.valueAsNumber, e2.valueAsNumber)

    if(e1.valueAsNumber > e2.valueAsNumber){

      let temp = e1.valueAsNumber;
      e1.valueAsNumber = e2.valueAsNumber;
      e2.valueAsNumber = temp;

    }

  }

  self.settingsgui.matchpreset(self);

  self.settingsgui.doneinit = true;

}

function setpresetdate(self, presetname){

  if(presetname in self.settings.presets == false){

    let presets = Object.keys(self.settings.presets);
    presetname = presets[presets.length-2];

  }

  let preset = self.settings.presets[presetname];

  self.settings.range1 = [...preset.range1];

  self.settingsgui.range1[1].valueAsNumber = preset.range1[0];
  self.settingsgui.range1[2].valueAsNumber = preset.range1[1];

  self.settings.preset = presetname

  self.settingsgui.matchpreset(self);

}




function addcalendar(main=false,self=calendarpreset,name=null){

  let num1 = null;
  let num2 = null;

  problemarr = [];

  if(main == false){

    let num = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0])
    problemarr = [num];
    problemlist.push([name, problemarr]);

  }
  else{

    num1 = 0;
    problemarr = [num1]

    problemlist.push([name,problemarr]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");

  let part = problemarr[0];

  problem.innerHTML = new Date(part).toLocaleDateString();
  problem.classList.add("problem");

  if(main) problem.id = "mainproblem"

  problem.classList.add("calendarproblem")

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);



  return problem;

}

function calendarspeech(problem){

  return problem[0];

}

function calendartype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "abcdefghijklmnopqrstuvwxyz"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;

}

function calendaranswer(problem){

  let answers = ["m", "tu", "w", "th", "f", "sa", "su"];
  const d = new Date(problem[0]);
  let day = d.getDay();

  day--;
  if(day < 0) day = answers.length-1;

  return answers[day];

}

function calendarvalidate(answer, inputnumber){

  let input = inputnumber+"";
  input = input.toLowerCase();

  if(input.length < answer.length){
    if(input[0] != answer[0]) return "fail";
    return false;
  }

  if(input.startsWith(answer)) return true;
  else return "fail"



}
