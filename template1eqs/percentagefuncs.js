
let percentagepreset = {
  id: "percentageequation",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addpercentage,
  ontype: percentagetype,
  getanswer: percentageanswer,
  validate: percentagevalidate,
  speechText: percentagespeech,
  name: "percentages",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [0,9],
        range2: [0,10,20,30,40,50,60,70,80,90,100]
      },
      "medium":{
        range1: [0,9],
        range2: [0,10,20,25,30,40,50,60,70,75,80,90,100]
      },
      "hard":{
        range1: [0,9],
        range2: [0,10,20,25,30,40,50,60,70,75,80,90,100,110,120,125,130,140,150,160,170,175,180,190,200]
      },
      "custom":{}
    },
    range1: [0,9],
    range2: [0,10,20,30,40,50,60,70,80,90,100],
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetindgen("Number Range", "Percentages"),
    setpreset: setpresetind,
    matchpreset: matchpreset,

  }

}

function basicpresetindgen(range1label, range2label){
  return (self, changegui=true) => {basicindpreset(self, range1label, range2label, changegui)}
}

function basicindpreset(self, range1label, range2label, changegui){
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

  let range1 = makeinputrange();
  let range2 = makesingleinput();

  range1[1].value = self.settings.range1[0];
  range1[2].value = self.settings.range1[1];
  range1[1].oninput = () => { oninput(range1[1]) }
  range1[2].oninput = () => { oninput(range1[2]) }
  range1[1].onblur = () => {self.settings.range1[0] = onblur(range1[1]); swap(range1[1], range1[2]); self.settingsgui.matchpreset(self) }
  range1[2].onblur = () => {self.settings.range1[1] = onblur(range1[2]); swap(range1[1], range1[2]); self.settingsgui.matchpreset(self) }
  self.settingsgui.range1 = range1;

  modesettingssection.appendChild(numRange);
  modesettingssection.appendChild(range1[0])

  range2[1].value = self.settings.range2.join(",");
  range2[1].oninput = () => { oninputlist(range2[1])}
  range2[1].onblur = () => {self.settings.range2 = onblurlist(range2[1]); self.settingsgui.matchpreset(self) }
  self.settingsgui.range2 = range2[1];

  modesettingssection.appendChild(numRange2);
  modesettingssection.appendChild(range2[0])

  function oninput(input){

    let allowed = "-0123456789";
    let chars = "";

    for(var i = 0; i < input.value.length; i++){
      if(allowed.indexOf(input.value[i]) != -1) chars += input.value[i];
    }

    input.value = chars;

    return input.value;

  }
  function oninputlist(input){

    let allowed = "0123456789,";
    let chars = "";

    for(var i = 0; i < input.value.length; i++){
      if(allowed.indexOf(input.value[i]) != -1) chars += input.value[i];
    }

    input.value = chars;

    return input.value;

  }
  function onblur(input){

    let parsed = parseInt(input.value);
    if(parsed+"" == "NaN") parsed = 0;
    input.value = parsed;

    return parsed;

  }

  function onblurlist(input){

    let values = [];

    let list = input.value.split(",");

    for(var i = 0; i < list.length; i++){

      let parsed = parseInt(list[i]);

      if(parsed+"" == "NaN") parsed = 0;

      if(values.indexOf(parsed) == -1) values.push(parsed);

    }

    if(values.length == 0) values = [0];
    values.sort((a,b) => a-b);

    input.value = values.join(",");

    return values;

  }

  function swap(e1, e2){

    if(parseInt(e1.value) > parseInt(e2.value)){

      let temp = e1.value;
      e1.value = e2.value;
      e2.value = temp;

    }

  }

  self.settingsgui.matchpreset(self);

  self.settingsgui.doneinit = true;

}



function setpresetind(self, presetname){

  if(presetname in self.settings.presets == false){

    let presets = Object.keys(self.settings.presets);
    presetname = presets[presets.length-2];

  }

  let preset = self.settings.presets[presetname];

  self.settings.range1 = [...preset.range1];
  self.settings.range2 = [...preset.range2];

  self.settingsgui.range1[1].value = preset.range1[0];
  self.settingsgui.range1[2].value = preset.range1[1];

  self.settingsgui.range2.value = preset.range2.join(",");

  self.settings.preset = presetname

  self.settingsgui.matchpreset(self);

}



function addpercentage(main=false,self=percentagepreset,name=null){

  let num1 = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);
  let num2 = self.settings.range2[Math.floor(Math.random() * self.settings.range2.length)];

  if(main == false) problemlist.push([name,[num1,num2]]);
  else{

    num1 = 0;
    num2 = 0;

    problemlist.push([name,[num1, num2]]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");
  problem.innerHTML = num2 + "% of " + num1
  problem.classList.add("problem");

  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function percentagespeech(problem){

  return problem[1] + " percent of " + problem[0]

}

function percentagetype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789."

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;

}

function percentageanswer(problem){

  console.log(problem)

    return (problem[1] / 100) * problem[0]
}

function percentagevalidate(answer, inputnumber){

  let input = parseFloat(inputnumber);

  if(input+"" == "NaN");
  input = 999999999999;

  return Math.abs(answer-parseFloat(inputnumber)) < 0.001;
}
