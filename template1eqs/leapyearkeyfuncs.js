let leapyearkeypreset = {
  id: "leapyearkeyequation",
  template: "template1equation",
  addproblem: addleapyearkey,
  ontype: leapyearkeytype,
  getanswer: leapyearkeyanswer,
  validate: leapyearkeyvalidate,
  answerText: leapyearkeyanswertext,
  speechText: leapyearkeyspeech,
  name: "day of week [leap year]",
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

function basicpresetgenyear(range1label){
  return (self, changegui=true) => { basicpresetyear(self, range1label, changegui); }
}

function basicpresetyear(self, range1label, changegui){
  let modesettingsbutton = document.getElementById("modesettingsbutton");
  let modesettingssection = document.getElementById("modesettingssection");

  if(!changegui){
    modesettingsbutton = document.createElement("div");
    modesettingssection = document.createElement("div");
  }

  let presetLabel = document.createElement("p");
  presetLabel.innerHTML = "&nbsp;";
  presetLabel.classList.add("settinglabel");
  modesettingssection.appendChild(presetLabel);

  let radioPresets = ["easy", "medium", "hard", "custom"];
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
    radioParent.style.alignItems = "center";
    radioParent.classList.add("radiosettingparent");

    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "difficulty");
    radio.id = radioPresets[i] + "presetsettings";
    radio.classList.add("radiosetting");

    self.settings.presets[radioPresets[i]].button = radio;
    if(radioPresets[i] == self.settings.preset) radio.checked = true;

    radioParent.appendChild(radio);

    let radioLabel = document.createElement("p");
    radioLabel.innerHTML = radioPresets[i];
    radioParent.appendChild(radioLabel);
    radioButtons.appendChild(radioParent);
    radioLabel.classList.add("radiolabel");

    if(radioPresets[i] != "custom"){
      radio.onclick = () => { self.settingsgui.setpreset(self, radioPresets[num]); };
    } else {
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
    parent.style.justifyContent = "center";
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    input1.style.margin = "7px";
    input2.style.margin = "7px";
    input1.classList.add("numinput");
    input2.classList.add("numinput");
    parent.appendChild(input1);
    parent.appendChild(input2);
    return [parent, input1, input2];
  }

  let range1 = makeinputrange();
  range1[1].value = self.settings.range1[0];
  range1[2].value = self.settings.range1[1];

  function oninput(inp){ return parseInt(inp.value) || 0; }
  function onblur(inp){
    let v = parseInt(inp.value);
    if(v + "" == "NaN") inp.value = 0;
    return v || 0;
  }
  function swap(i1, i2){
    if(parseInt(i1.value) > parseInt(i2.value)){
      let t = i1.value; i1.value = i2.value; i2.value = t;
    }
  }

  range1[1].oninput = () => { oninput(range1[1]); };
  range1[2].oninput = () => { oninput(range1[2]); };
  range1[1].onblur = () => { onblur(range1[1]); swap(range1[1], range1[2]); self.settings.range1[0] = parseInt(range1[1].value); self.settings.range1[1] = parseInt(range1[2].value); self.settingsgui.matchpreset(self); };
  range1[2].onblur = () => { onblur(range1[2]); swap(range1[1], range1[2]); self.settings.range1[1] = parseInt(range1[2].value); self.settings.range1[0] = parseInt(range1[1].value); self.settingsgui.matchpreset(self); };
  self.settingsgui.range1 = range1;

  modesettingssection.appendChild(numRange);
  modesettingssection.appendChild(range1[0]);

  self.settingsgui.matchpreset(self);
  self.settingsgui.doneinit = true;
}

function setpresetyear(self, presetname){
  if(!(presetname in self.settings.presets)){
    let presets = Object.keys(self.settings.presets);
    presetname = presets[presets.length - 2];
  }
  let preset = self.settings.presets[presetname];
  self.settings.range1 = [...preset.range1];
  self.settingsgui.range1[1].value = preset.range1[0];
  self.settingsgui.range1[2].value = preset.range1[1];
  self.settings.preset = presetname;
  self.settingsgui.matchpreset(self);
}

function isLeapYear(year){
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function addleapyearkey(main=false, self=leapyearkeypreset, name=null){

  let year = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1)) + self.settings.range1[0];

  if(main){
    year = 1900;
  }

  problemlist.push([name, [year]]);

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = "Leap? " + year;

  problem.classList.add("problem");
  problem.classList.add("monthnumproblem");

  if(main) problem.id = "mainproblem";

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function leapyearkeyspeech(problem){
    return "¿Bisiesto " + problem[0] + "?";
}

function leapyearkeytype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let valid = "abcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < input.value.length; i++){
    if(valid.indexOf(input.value[i].toLowerCase()) == -1) continue;
    nonums += input.value[i];
  }

  input.value = nonums;

}

function leapyearkeyanswer(problem){
  return isLeapYear(problem[0]) ? 6 : 0;
}

function leapyearkeyanswertext(answer){
  if(answer === 6) return "bisiesto: s / 6";
  return "no bisiesto: n / 0";
}

function leapyearkeyvalidate(answer, inputnumber){

  let input = (inputnumber + "").toLowerCase().trim();
  if(input.length == 0) return false;
  if(input.length > 1) return "fail";

  if(answer === 6){
    if(input === "6" || input === "s") return true;
    return "fail";
  } else {
    if(input === "0" || input === "n") return true;
    return "fail";
  }

}
