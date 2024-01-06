
let clockpreset = {
  id: "clockequation",
  name: "clock to time",
  template: "template1equation",
  addproblem: addclock,
  ontype: clocktype,
  getanswer: clockanswer,
  validate: clockvalidate,
  speechText: clockspeech,
  settings: {
    preset: "easy",
    presets:{
      "easy":{
        range: [10],
        nonummode: false,
        secondsmode: false
      },
      "medium":{
        range: [5],
        nonummode: false,
        secondsmode: false
      },
      "hard":{
        range: [0],
        nonummode: false,
        secondsmode: false
      },
      "custom":{}
    },
    range: [10],
    nonummode: false,
    secondsmode: false
  },
  settingsgui: {

    range: null,
    nonummode: null,
    doneinit: false,
    init: basicpresetgen1input("Allowed Minute Error"),
    setpreset: setpreset1input,
    matchpreset: matchpreset,

  }
}


function basicpresetgen1input(range1label){
  return (self, changegui=true) => {basicpreset1input(self, range1label, changegui)}
}

function basicpreset1input(self, range1label, changegui){
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

  function makeinputrange(){

    let parent = document.createElement("div");
    parent.style.display = "flex";
    parent.style.justifyContent = "center"

    let input1 = document.createElement("input")

    input1.style.margin = "7px";

    input1.classList.add("numinput");

    parent.appendChild(input1);

    return [parent, input1];

  }

  let range = makeinputrange();

  range[1].value = self.settings.range[0];
  range[1].oninput = () => { oninput(range[1]) }
  range[1].onblur = () => {self.settings.range[0] = onblur(range[1]); self.settingsgui.matchpreset(self) }
  self.settingsgui.range = range;

  modesettingssection.appendChild(numRange);
  modesettingssection.appendChild(range[0])

  function oninput(input){

    let allowed = "0123456789";
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



  let notickmode = document.createElement("input");
  notickmode.setAttribute("type", "checkbox");
  notickmode.name = "nonummode";

  notickmode.onclick = (event) => {
    console.log("HERE");
    self.settings.nonummode = event.target.checked;

    console.log(self);

    self.settingsgui.matchpreset(self)
  }

  self.settingsgui.nonummode = notickmode;
  self.settingsgui.nonummode.checked = self.settings.nonummode;

  let noticklabel = document.createElement("label");
  noticklabel.setAttribute("for", "nonummode");
  noticklabel.innerHTML = "No numbers";

  let notickparent = document.createElement("div");
  notickparent.appendChild(notickmode);
  notickparent.appendChild(noticklabel);

  notickmode.classList.add("modesettingcheckboxinner")
  notickparent.classList.add("modesettingcheckbox")



  let secondsmode = document.createElement("input");
  secondsmode.setAttribute("type", "checkbox");
  secondsmode.name = "secondsmode";

  secondsmode.onclick = (event) => {
    self.settings.secondsmode = event.target.checked;

    console.log(self);

    self.settingsgui.matchpreset(self)
  }

  self.settingsgui.secondsmode = secondsmode;
  self.settingsgui.secondsmode.checked = self.settings.secondsmode;

  let secondslabel = document.createElement("label");
  secondslabel.setAttribute("for", "secondsmode");
  secondslabel.innerHTML = "Seconds mode";

  let secondsparent = document.createElement("div");
  secondsparent.appendChild(secondsmode);
  secondsparent.appendChild(secondslabel);

  secondsmode.classList.add("modesettingcheckboxinner")
  secondsparent.classList.add("modesettingcheckbox")



  modesettingssection.appendChild(notickparent);
  modesettingssection.appendChild(secondsparent);

  self.settingsgui.matchpreset(self);

  self.settingsgui.doneinit = true;

}

function setpreset1input(self, presetname){

  if(presetname in self.settings.presets == false){

    let presets = Object.keys(self.settings.presets);
    presetname = presets[presets.length-2];

  }

  let preset = self.settings.presets[presetname];

  self.settings.range = [...preset.range];

  self.settingsgui.range[1].value = preset.range[0];

  self.settings.nonummode = preset.nonummode;
  self.settings.secondsmode = preset.secondsmode;

  self.settingsgui.nonummode.checked = preset.nonummode;
  self.settingsgui.secondsmode.checked = preset.nonummode;

  self.settings.preset = presetname

  self.settingsgui.matchpreset(self);

}


function addclock(main=false,self=clockpreset,name=null){


  let time = Math.random() * 12 + 1;
  let hour = Math.floor(time);
  let minute = Math.floor(time % 1 * 60);
  let second = self.settings.secondsmode ? Math.floor(Math.random() * 60) : 0;



  if(main == false) problemlist.push([name, [hour, minute, second]]);
  else{

    time = 12;
    hour = 12;
    minute = 0;
    second = 0;

    problemlist.push([name, [hour, minute, second]]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("canvas");

  let clocksize = parseInt(getComputedStyle(document.body).getPropertyValue('--clock_size'));

  let clock_radius = clocksize * 0.92 / 2;

  problem.width = clocksize;
  problem.height = clocksize;

  problem.classList.add("clockcanvas");
  problem.classList.add("problem");
  problem.classList.add("clockproblem")

  let ctx = problem.getContext("2d");

  ctx.beginPath();
  ctx.arc(clocksize/2, clocksize/2, clock_radius, 0, 2 * Math.PI);

  let text_color = getComputedStyle(document.body).getPropertyValue('--text_color');
  let text_select_color = getComputedStyle(document.body).getPropertyValue('--text_select_color');


  console.log(text_color);

  ctx.strokeStyle = text_color;
  ctx.lineWidth = 3;
  ctx.stroke();

  let circlesize = 0.07;

  ctx.fillStyle = text_color;

  ctx.lineWidth = 1.5;

  for(var i = 0; i < 12; i++){

    let angle = 2*Math.PI * i / 12 + 2 * Math.PI / 12 - Math.PI / 2;

    let hour = i + 1;

    let dx = clock_radius * Math.cos(angle);
    let dy = clock_radius * Math.sin(angle);

    let line_size = 0.87;
    let text_point = 0.77;
    let text_size = 15;

    let dx2 = dx * line_size;
    let dy2 = dy * line_size;

    ctx.fillStyle = text_color;

    ctx.beginPath();
    ctx.moveTo(clocksize/2 + dx, clocksize/2 + dy);
    ctx.lineTo(clocksize/2 + dx2, clocksize/2 + dy2);
    ctx.stroke();

    ctx.font = text_size + "px Arial";
    ctx.textAlign = "center";

    if(self.settings.nonummode == false) ctx.fillText(hour+"", clocksize/2 + dx*text_point, clocksize/2 + dy*text_point + text_size/2 - 2)

  }

  for(var i = 0; i < 60; i++){
    let angle = 2*Math.PI * i / 60 + 2 * Math.PI / 12 - Math.PI / 2;

    let minute = i + 1;

    let dx = clock_radius * Math.cos(angle);
    let dy = clock_radius * Math.sin(angle);

    let line_size = 0.93;

    let dx2 = dx * line_size;
    let dy2 = dy * line_size;

    ctx.fillStyle = text_color;

    ctx.beginPath();
    ctx.moveTo(clocksize/2 + dx, clocksize/2 + dy);
    ctx.lineTo(clocksize/2 + dx2, clocksize/2 + dy2);
    ctx.stroke();
  }

  let hourwidth = 4;
  let minutewidth = 4;
  let secondwidth = 1.5;

  let hoursize = 0.45;
  let minutesize = 0.65;
  let secondsize = 0.8;

  let hourangle = 2 * Math.PI * time / 12 - Math.PI / 2;
  let minuteangle = 2 * Math.PI * minute / 60 - Math.PI / 2;
  let secondangle = (second / 60)  * 2 * Math.PI - Math.PI / 2;


  if(self.settings.secondsmode){
    console.log("yes");

    ctx.strokeStyle = text_select_color;

    ctx.lineWidth = secondwidth;
    ctx.beginPath();
    ctx.moveTo(clocksize/2 + secondsize * clock_radius * Math.cos(secondangle), clocksize/2 + secondsize * clock_radius * Math.sin(secondangle))
    ctx.lineTo(clocksize/2, clocksize/2);
    ctx.stroke();
  }

  ctx.strokeStyle = text_color;
  ctx.fillStyle = text_color;

  ctx.beginPath();
  ctx.arc(clocksize/2, clocksize/2, clock_radius * circlesize, 0, 2 * Math.PI);
  ctx.fill();


  ctx.lineWidth = hourwidth;
  ctx.beginPath();
  ctx.moveTo(clocksize/2 + hoursize * clock_radius * Math.cos(hourangle), clocksize/2 + hoursize * clock_radius * Math.sin(hourangle))
  ctx.lineTo(clocksize/2, clocksize/2);
  ctx.stroke();

  ctx.lineWidth = minutewidth;
  ctx.beginPath();
  ctx.moveTo(clocksize/2 + minutesize * clock_radius * Math.cos(minuteangle), clocksize/2 + minutesize * clock_radius * Math.sin(minuteangle))
  ctx.lineTo(clocksize/2, clocksize/2);
  ctx.stroke();


  if(main) problem.id = "mainproblem"

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);


  return problem;

}

function clockspeech(problem){

  let part1 = problem[0];
  let part2 = problem[1];

  return part1 + " " + part2;

}


function clocktype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "0123456789: "

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;


}

function clockanswer(problem){
  return problem;
}

function clockvalidate(answer, input){

  let values = input.split(":");

  if(values.length < 2){
    values = input.split(" ");
    if(values.length < 2) return false;
  }

  let hour = values[0];
  let minute = values[1];
  let second = values.length > 2 ? values[2] : 0;

  //console.log(second, values);

  if( (parseInt(minute) < 10 && minute.length != 2) || (clockpreset.settings.secondsmode && parseInt(second) < 10 && second.length != 2) ) return false;

  hour = parseInt(hour);
  minute = parseInt(minute);
  second = parseInt(second);

  //console.log(hour, minute, second, answer[0], answer[1], answer[2]);

  let tinput = hour + minute * 1/60 + second * 1/3600;
  let tanswer = answer[0] + answer[1] * 1/60 + answer[2] * 1/3600;
  let tdist = Math.abs(tinput - tanswer)

  if(Math.abs(tdist - 12) < tdist) tdist = Math.abs(tdist - 12);

  tdist *= 60;

  //console.log(tdist);

  return tdist <= clockpreset.settings.range;

}

function clockenter(e, press=false){

  validateanswer(e, clockvalidate, addclock, clockanswer, press, scrollamount=100);

}
