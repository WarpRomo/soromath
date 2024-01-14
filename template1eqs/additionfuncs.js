
let additionpreset = {
  id: "additionequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addaddition,
  ontype: additiontype,
  getanswer: additionanswer,
  validate: additionvalidate,
  speechText: additionspeech,
  name: "addition",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [0,9],
        range2: [0,9],
        range3: []
      },
      "medium":{
        range1: [0,99],
        range2: [0,99],
        range3: []
      },
      "hard":{
        range1: [0,999],
        range2: [0,999],
        range3: []
      },
      "custom":{}
    },
    range1: [0,9],
    range2: [0,9],
    range3: []
  },
  settingsgui: {

    range1: null,
    range2: null,
    range3: null,
    doneinit: false,
    init: basicpresetgen("Number Range 1", "Number Range 2", "Variable Range"),
    setpreset: setpreset,
    matchpreset: matchpreset,

  }

}

function basicpresetgen(range1label, range2label, range3label=false, secdecimal=false){
  return (self, changegui=true) => {basicpreset(self, range1label, range2label, range3label, secdecimal, changegui)}
}

function basicpreset(self, range1label, range2label, range3label, secdecimal, changegui){
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

  let radioPresets = ["easy", "medium", "hard", "custom"]

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

  let numRange2 = document.createElement("p");
  numRange2.innerHTML = range2label;
  numRange2.classList.add("settinglabel");
  numRange2.style.marginTop = "20px";


  function makeinputrange(){

    let parent = document.createElement("div");
    parent.style.display = "flex";
    parent.style.justifyContent = "center"

    let input1 = document.createElement("input")
    let input2 = document.createElement("input")

    input1.style.margin = "7px";
    input2.style.margin = "7px";

    input1.classList.add("numinput");
    input2.classList.add("numinput");

    parent.appendChild(input1);
    parent.appendChild(input2);

    return [parent, input1, input2];

  }

  let range1 = makeinputrange();
  let range2 = makeinputrange();

  range1[1].value = self.settings.range1[0];
  range1[2].value = self.settings.range1[1];
  range1[1].oninput = () => { oninput(range1[1]) }
  range1[2].oninput = () => { oninput(range1[2]) }
  range1[1].onblur = () => {self.settings.range1[0] = onblur(range1[1]); swap(range1[1], range1[2], "range1"); self.settingsgui.matchpreset(self) }
  range1[2].onblur = () => {self.settings.range1[1] = onblur(range1[2]); swap(range1[1], range1[2], "range1"); self.settingsgui.matchpreset(self) }
  self.settingsgui.range1 = range1;

  modesettingssection.appendChild(numRange);
  modesettingssection.appendChild(range1[0])

  range2[1].value = self.settings.range2[0];
  range2[2].value = self.settings.range2[1];
  range2[1].oninput = () => { oninput(range2[1], secdecimal)}
  range2[2].oninput = () => { oninput(range2[2], secdecimal)}
  range2[1].onblur = () => {self.settings.range2[0] = onblur(range2[1], secdecimal); swap(range2[1], range2[2], "range2"); self.settingsgui.matchpreset(self) }
  range2[2].onblur = () => {self.settings.range2[1] = onblur(range2[2], secdecimal); swap(range2[1], range2[2], "range2"); self.settingsgui.matchpreset(self) }
  self.settingsgui.range2 = range2;

  modesettingssection.appendChild(numRange2);
  modesettingssection.appendChild(range2[0])

  function makesingleinput(){
    let parent = document.createElement("div");
    parent.style.display = "flex";
    parent.style.justifyContent = "center"

    let input1 = document.createElement("input")

    input1.style.margin = "7px";

    input1.classList.add("numinput");
    input1.classList.add("widenuminput");

    parent.appendChild(input1);

    return [parent, input1];
  }

  if(range3label != false){

    let range3 = makesingleinput();

    range3[1].value = self.settings.range3.join(",");

    let numRange3 = document.createElement("p");
    numRange3.innerHTML = range3label;
    numRange3.classList.add("settinglabel");
    numRange3.style.marginTop = "20px";

    modesettingssection.appendChild(numRange3);
    modesettingssection.appendChild(range3[0])

    self.settingsgui.range3 = range3;

    range3[1].onblur = () => {onblurvariable(range3[1])};

  }

  function onblurvariable(input){

    let allowed = "-0123456789,";
    let chars = "";

    for(var i = 0; i < input.value.length; i++){

      if(allowed.indexOf(input.value[i]) != -1) chars += input.value[i];

    }

    chars = chars.split(",");
    chars = chars.map(e => parseInt(e));
    chars = chars.filter(e => e+""!="NaN");

    if(chars.length % 4 != 0) chars = [];

    for(var i = 0; i < chars.length; i+=4){
      if(chars[i+2] > chars[i+3]) [chars[i+2], chars[i+3]] = [chars[i+3], chars[i+2]];
      if(chars[i] > chars[i+1]) [chars[i], chars[i+1]] = [chars[i+1], chars[i]];
    }

    if(chars.length != 0){
      range1[1].value = "";
      range1[2].value = "";

      range2[1].value = "";
      range2[2].value = "";

      input.value = chars.join(",");

      self.settings.range1 = [null,null];
      self.settings.range2 = [null,null];
      self.settings.range3 = chars;

      self.settingsgui.matchpreset(self)

      return chars;
    }

    self.settingsgui.setpreset(self, "easy");

    return chars;

  }


  function oninput(input, secdecimal=false){

    let allowed = "-0123456789";
    if(secdecimal) allowed += "."

    let chars = "";

    for(var i = 0; i < input.value.length; i++){
      if(allowed.indexOf(input.value[i]) != -1) chars += input.value[i];
    }

    input.value = chars;

    return input.value;

  }
  function onblur(input, secdecimal){

    let parsed = parseInt(input.value);
    if(secdecimal) parsed = parseFloat(input.value);
    
    if(parsed+"" == "NaN") parsed = 0;
    input.value = parsed;

    if(range1[1].value == ""){
      range1[1].value = 0;
      self.settings.range1[0] = 0;
    }
    if(range1[2].value == ""){
      range1[2].value = 0;
      self.settings.range1[1] = 0;
    }
    if(range2[1].value == ""){
      range2[1].value = 0;
      self.settings.range2[0] = 0;
    }
    if(range2[2].value == ""){
      range2[2].value = 0;
      self.settings.range2[1] = 0;
    }

    if(self.settings.range3 != undefined){
      self.settings.range3 = [];
      self.settingsgui.range3[1].value = "";
    }

    return parsed;

  }

  function swap(e1, e2, key){

    if(parseFloat(e1.value) > parseFloat(e2.value)){

      let temp = e1.value;
      e1.value = e2.value;
      e2.value = temp;

      [self.settings[key][0], self.settings[key][1]] = [self.settings[key][1], self.settings[key][0]]

    }

  }

  self.settingsgui.matchpreset(self);

  self.settingsgui.doneinit = true;

}




function matchpreset(self){

  let presets = self.settings.presets;
  let keys = Object.keys(presets);

  L: for(var i = 0; i < keys.length; i++){

    if(keys[i] == "custom") continue;

    let keys2 = Object.keys(presets[keys[i]]);

    for(var j = 0; j < keys2.length; j++){

      if(keys2[j] == "button") continue;

      let val = self.settings[keys2[j]];
      let val2 = presets[keys[i]][keys2[j]];

      if(JSON.stringify(val) != JSON.stringify(val2)){

        continue L;

      }

    }

    self.settings.preset = keys[i];
    presets[keys[i]].button.checked = true;
    self.settings.presets["custom"].button.parentElement.style.opacity = 0.2;
    if(modesettingopen == self.name) modesettingsbutton.children[0].innerHTML = self.name + " (" + self.settings.preset + ")"
    buttonelems[self.name].children[0].innerHTML = self.name + " (" + self.settings.preset + ")"

    matchdifficulty();
    return;

  }

  self.settings.preset = "custom";
  self.settings.presets["custom"].button.checked = true;
  self.settings.presets["custom"].button.parentElement.style.opacity = 1;
  if(modesettingopen == self.name) modesettingsbutton.children[0].innerHTML = self.name + " (" + self.settings.preset + ")"
  buttonelems[self.name].children[0].innerHTML = self.name + " (" + self.settings.preset + ")"

  init();

  matchdifficulty();

}

function setpreset(self, presetname){

  if(presetname in self.settings.presets == false){

    let presets = Object.keys(self.settings.presets);
    presetname = presets[presets.length-2];

  }

  let preset = self.settings.presets[presetname];

  self.settings.range1 = [...preset.range1];
  self.settings.range2 = [...preset.range2];


  self.settingsgui.range1[1].value = preset.range1[0];
  self.settingsgui.range1[2].value = preset.range1[1];

  self.settingsgui.range2[1].value = preset.range2[0];
  self.settingsgui.range2[2].value = preset.range2[1];

  if(self.settings.range3 != undefined){
    self.settings.range3 = [...preset.range3];
    self.settingsgui.range3[1].value = preset.range3.join(",");
  }

  self.settings.preset = presetname

  console.log("yurrrrr");

  self.settingsgui.matchpreset(self);

}



function addaddition(main=false,self=additionpreset,name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);
  let num2 = Math.floor(Math.random() * (self.settings.range2[1] - self.settings.range2[0] + 1) + self.settings.range2[0]);

  if(self.settings.range3 != undefined && self.settings.range3.length != 0){

    let range = self.settings.range3;

    let val = Math.floor( Math.floor( Math.random() * range.length ) / 4 ) * 4;

    num1 = Math.floor(Math.random() * (range[val+1] - range[val] + 1) + range[val] );
    num2 = Math.floor(Math.random() * (range[val+3] - range[val+2] + 1) + range[val+2] );

  }

  if(main == false) problemlist.push([name,[num1,num2]]);
  else{

    num1 = 0;
    num2 = 0;

    problemlist.push([name,[num1, num2]]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = num1 + "+" + num2 + " " + "="
  problem.classList.add("problem");

  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function additionspeech(problem){

  return (problem[0] < 0 ? "negative " : "") + Math.abs(problem[0]) + " plus " + (problem[1] < 0 ? "negative " : "") + Math.abs(problem[1]);

}

function additiontype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;

}

function additionanswer(problem){
    return problem[0]+problem[1];
}

function additionvalidate(answer, inputnumber){
  return answer==parseInt(inputnumber);
}
