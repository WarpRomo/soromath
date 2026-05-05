
let calendarpreset = {
  id: "calendarday",
  diffs: [0,1,2],
  template: "template1equation",
  addproblem: addcalendar,
  ontype: calendartype,
  getanswer: calendaranswer,
  validate: calendarvalidate,
  answerText: calendarkeyanswertext,
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

let calendarinitialdate = new Date(1970, 0, 4, 12, 0, 0, 0).getTime();


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

function calendarresolvedsettings(settings){
  if(settings != undefined && settings.dateOrder != undefined) return settings;

  if(typeof calendarappsettings != "undefined") return calendarappsettings;

  return {
    dateOrder: "DMY",
    monthFormat: "numeric2",
    dateSeparator: "/",
    monthLanguage: "en"
  };
}

function calendardateseparator(settings=calendarresolvedsettings()){
  settings = calendarresolvedsettings(settings);
  if(settings.dateSeparator == "de") return " de ";
  return settings.dateSeparator == "space" ? " " : settings.dateSeparator;
}

function calendarformatmonth(month, settings=calendarresolvedsettings()){
  settings = calendarresolvedsettings(settings);

  let monthnames = {
    en: {
      short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    es: {
      short: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      long: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    }
  };

  let monthpart = month + 1;
  if(settings.monthFormat == "numeric2") monthpart = (month + 1).toString().padStart(2, "0");
  if(settings.monthFormat == "short" || settings.monthFormat == "long"){
    let language = monthnames[settings.monthLanguage] == undefined ? "en" : settings.monthLanguage;
    monthpart = monthnames[language][settings.monthFormat][month];
  }

  return monthpart;
}

function calendarformatmonthyear(month, year, settings=calendarresolvedsettings()){
  settings = calendarresolvedsettings(settings);
  let separator = calendardateseparator(settings);
  let monthpart = calendarformatmonth(month, settings);

  if(settings.dateOrder == "YMD") return [year, monthpart].join(separator);
  return [monthpart, year].join(separator);
}

function calendarformatdate(date, settings=calendarresolvedsettings()){
  settings = calendarresolvedsettings(settings);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let separator = calendardateseparator(settings);
  let monthpart = calendarformatmonth(month, settings);

  let parts = {
    D: day,
    M: monthpart,
    Y: year
  };

  return settings.dateOrder.split("").map(part => parts[part]).join(separator);
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

    num1 = calendarinitialdate;
    problemarr = [num1]

    problemlist.push([name,problemarr]);

  }

  if(recentduplicate()) return;

  let problem = document.createElement("p");

  let part = problemarr[0];

  problem.innerHTML = calendarformatdate(new Date(part));
  problem.classList.add("problem");

  if(main) problem.id = "mainproblem"

  problem.classList.add("calendarproblem")

  let problems = document.getElementsByClassName("mainproblems")[0];
  problems.appendChild(problem);



  return problem;

}

function calendarspeech(problem){

  return calendarformatdate(new Date(problem[0]));

}

function calendartype(e){

  let input = document.getElementsByClassName("maininput")[0];

  let nonums = "";
  let nums = "abcdefghijklmnopqrstuvwxyz0123456789"

  for(var i = 0; i < input.value.length; i++){
    if(nums.indexOf(input.value[i]) == -1) continue;
    nonums += input.value[i];
  }

  input.value  = nonums;

}

function calendaranswer(problem){

  const d = new Date(problem[0]);
  let day = d.getDay();

  day--;
  if(day < 0) day = 6;

  return day;

}

function dayofweekanswertext(answer){
  let singlecharanswers = ["l", "m", "x", "j", "v", "s", "d"];
  let numberanswer = answer + 1;
  if(answer == 6) numberanswer = 0;
  return singlecharanswers[answer] + " / " + numberanswer;
}

function calendarcenturykey(year){
  let century = Math.floor(year / 100);
  let centurymod = ((century % 4) + 4) % 4;
  return 6 - 2 * centurymod;
}

function calendaryearkey(year){
  let yearpart = ((year % 100) + 100) % 100;
  return (yearpart + Math.floor(yearpart / 4)) % 7;
}

function calendarnumericanswer(answer){
  if(answer == 6) return 0;
  return answer + 1;
}

function calendarkeyanswertextfromdate(answer, date){
  let year = date.getFullYear();
  let month = date.getMonth();
  let daykey = date.getDate() % 7;
  let monthkey = monthkeyvalues[month];
  let centurykey = calendarcenturykey(year);
  let yearkey = calendaryearkey(year);
  let leapkey = isLeapYear(year) && month < 2 ? -1 : 0;
  let parts = [daykey, monthkey, centurykey, yearkey];

  if(leapkey != 0) parts.push(leapkey);

  return parts.join(" + ").replace(" + -", " -") + " = " + calendarnumericanswer(answer);
}

function calendarkeyanswertext(answer, problem){
  return calendarkeyanswertextfromdate(answer, new Date(problem[0]));
}

function calendarexceptdayanswertext(answer, month, year){
  let monthkey = monthkeyvalues[month];
  let centurykey = calendarcenturykey(year);
  let yearkey = calendaryearkey(year);
  let leapkey = isLeapYear(year) && month < 2 ? -1 : 0;
  let parts = [monthkey, centurykey, yearkey];

  if(leapkey != 0) parts.push(leapkey);

  return parts.join(" + ").replace(" + -", " -") + " = " + calendarnumericanswer(answer);
}

function calendarvalidate(answer, inputnumber){

  let input = (inputnumber + "").toLowerCase().trim();
  let singlecharanswers = ["l", "m", "x", "j", "v", "s", "d"];

  if(input.length == 0) return false;
  if(input.length > 1) return "fail";

  if(/^[0-6]$/.test(input)){
    if(Number(input) == answer + 1) return true;
    if(answer == 6 && input == "0") return true;
    return "fail";
  }

  if(singlecharanswers.indexOf(input) == -1) return "fail";
  if(input == singlecharanswers[answer]) return true;
  return "fail";



}
