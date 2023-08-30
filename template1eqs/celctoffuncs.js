

let celctofpreset = {
  id: "celctofequation",
  template: "template1equation",
  addproblem: addcelctof,
  ontype: celctoftype,
  getanswer: celctofanswer,
  validate: celctofvalidate,
  speechText: celctofspeech,
  name: "C° to F°",
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range1: [0,100],
      },
      "medium":{
        range1: [-50,100],
      },
      "hard":{
        range1: [-500,500],
      },
      "custom":{}
    },
    range1: [0,100],
  },
  settingsgui: {

    range1: null,
    range2: null,
    doneinit: false,
    init: basicpresetgen1range("Degree Range"),
    setpreset: setpreset1range,
    matchpreset: matchpreset,

  }
}



function basicpresetgen1range(range1label){
  return (self, changegui=true) => {basicpreset1range(self, range1label, changegui)}
}

function basicpreset1range(self, range1label, changegui){
  let modesettingsbutton = document.getElementById("modesettingsbutton")
  let modesettingssection = document.getElementById("modesettingssection");

  if(!changegui){
    modesettingsbutton = document.createElement("div");
    modesettingssection = document.createElement("div");
  }

  let presetLabel = document.createElement("p");
  presetLabel.innerHTML = "Preset";
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

  range1[1].value = self.settings.range1[0];
  range1[2].value = self.settings.range1[1];
  range1[1].oninput = () => { oninput(range1[1]) }
  range1[2].oninput = () => { oninput(range1[2]) }
  range1[1].onblur = () => {self.settings.range1[0] = onblur(range1[1]); swap(range1[1], range1[2]); self.settingsgui.matchpreset(self) }
  range1[2].onblur = () => {self.settings.range1[1] = onblur(range1[2]); swap(range1[1], range1[2]); self.settingsgui.matchpreset(self) }
  self.settingsgui.range1 = range1;

  modesettingssection.appendChild(numRange);
  modesettingssection.appendChild(range1[0])

  function oninput(input){

    let allowed = "-0123456789";
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

function setpreset1range(self, presetname){

  if(presetname in self.settings.presets == false){

    let presets = Object.keys(self.settings.presets);
    presetname = presets[presets.length-2];

  }

  let preset = self.settings.presets[presetname];

  self.settings.range1 = [...preset.range1];

  self.settingsgui.range1[1].value = preset.range1[0];
  self.settingsgui.range1[2].value = preset.range1[1];

  self.settings.preset = presetname

  self.settingsgui.matchpreset(self);

}




function addcelctof(main=false,self=celctofpreset,name=null){


  let num = Math.floor(Math.random() * (self.settings.range1[1] - self.settings.range1[0] + 1) + self.settings.range1[0]);

  if(main == false) problemlist.push([name,[num]]);
  else{
     num = 0;
     problemlist.push([name,[num]]);
  }

  if(recentduplicate()) return;


  let problem = document.createElement("p");
  problem.innerHTML = num + "°C"
  problem.classList.add("problem");
  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);

  return problem;

}

function celctofspeech(problem){

  return (problem[0] < 0 ? "negative " : "") + Math.abs(problem[0]) + " degrees"


}

function celctoftype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "-0123456789."

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function celctofanswer(problem){
    return problem * 9/5 + 32
}

function celctofvalidate(answer, inputnumber){
  return answer==parseFloat(inputnumber);
}
