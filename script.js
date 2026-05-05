const synth = window.speechSynthesis;


let tabs = ["flashproblems", "generalsettings", "flashprofile"];
let currenttab = "flashproblems";

let currentmode = ["addition"];
let currenttemplate = "template1equation";
let currentdifficulty = "easy";

let templates = {

  "template1equation":{
    init: template1init,
    finish: template1finish,
    notit: template1switch
  },
  "flashanzanequation": {
    init: flashanzaninit,
    notit: flashanzanswitch
  }

};





let modes = {
  "addition": additionpreset,
  "multiplication": multpreset,
  "subtraction": subtractionpreset,
  "division": divisionpreset,
  "percentages":percentagepreset,
  "fraction addition": fractionpreset,
  "exponents": powerpreset,
  "quadratics": quadraticpreset,
  "Nth Roots": rootpreset,
  "linear equations": linearpreset,
  "trigonometry":trigpreset,
  "clock to time": clockpreset,

  "decimal to binary": dectobinpreset,
  "binary to decimal": bintodecpreset,

  "DOW [month key]": monthkeypreset,
  "DOW [century key]": centurykeypreset,
  "DOW [year key]": yearkeypreset,
  "DOW [century+year key]": centuryyearkeypreset,
  "DOW [except year]": exceptyearpreset,
  "DOW [except day]": exceptdaypreset,
  "DOW [leap year]": leapyearkeypreset,
  "Day of the week": calendarpreset,
  "flash anzan": flashanzanpreset,

  "month to number": monthnumpreset,

  "inches to cm": intocmpreset,
  "cm to inches": cmtoinpreset,

  "pounds to kg": lbtokgpreset,
  "kg to pounds": kgtolbpreset,

  "°C to °F": celctofpreset,
  "°F to °C": ftocelcpreset

}

let currentversion = "1";
let showlivecorrections = true;
let calendarappsettings = {
  dateOrder: "DMY",
  monthFormat: "numeric2",
  dateSeparator: "/",
  monthLanguage: "en"
};

function loadgeneralsettings(){
  if(localStorage["showlivecorrections"] != undefined){
    showlivecorrections = localStorage["showlivecorrections"] == "1";
  }

  if(localStorage["calendar_dateOrder"] != undefined){
    calendarappsettings.dateOrder = localStorage["calendar_dateOrder"];
  }
  if(localStorage["calendar_monthFormat"] != undefined){
    calendarappsettings.monthFormat = localStorage["calendar_monthFormat"];
  }
  if(localStorage["calendar_dateSeparator"] != undefined){
    calendarappsettings.dateSeparator = localStorage["calendar_dateSeparator"];
  }
  if(localStorage["calendar_monthLanguage"] != undefined){
    calendarappsettings.monthLanguage = localStorage["calendar_monthLanguage"];
  }

  let checkbox = document.getElementById("showlivecorrections");
  if(checkbox != null){
    checkbox.checked = showlivecorrections;
  }

  let dateOrder = document.getElementById("generaldateorder");
  if(dateOrder != null) dateOrder.value = calendarappsettings.dateOrder;

  let monthFormat = document.getElementById("generalmonthformat");
  if(monthFormat != null) monthFormat.value = calendarappsettings.monthFormat;

  let dateSeparator = document.getElementById("generaldateseparator");
  if(dateSeparator != null) dateSeparator.value = calendarappsettings.dateSeparator;

  let monthLanguage = document.getElementById("generalmonthlanguage");
  if(monthLanguage != null) monthLanguage.value = calendarappsettings.monthLanguage;
}

function setshowlivecorrections(value){
  showlivecorrections = value === true;
  localStorage["showlivecorrections"] = showlivecorrections ? "1" : "0";

  if(!showlivecorrections && typeof template1clearcorrection == "function"){
    template1clearcorrection();
  }
}

function setcalendarappsetting(key, value){
  if(calendarappsettings[key] == value) return;

  calendarappsettings[key] = value;
  localStorage["calendar_" + key] = value;
  init();
}

function setgeneraldateorder(value){
  setcalendarappsetting("dateOrder", value);
}

function setgeneralmonthformat(value){
  setcalendarappsetting("monthFormat", value);
}

function setgeneraldateseparator(value){
  setcalendarappsetting("dateSeparator", value);
}

function setgeneralmonthlanguage(value){
  setcalendarappsetting("monthLanguage", value);
}

function showgeneralsettings(){
  switchtab("generalsettings");
}

function loaddifficulty(){

  if(localStorage["difficultysettings"] == undefined || localStorage["currentversion"] != currentversion){

    console.log("Create new state");

    savedifficulty();

  }

  console.log("Loading");

  let difficultysettings = JSON.parse(localStorage["difficultysettings"]);

  let keys = Object.keys(difficultysettings);

  for(var i = 0; i < keys.length; i++){

    if((keys[i] in modes) == false) continue;

    let keys2 = Object.keys(difficultysettings[keys[i]]);

    for(var j = 0; j < keys2.length; j++){

      if((keys2[j] in modes[keys[i]].settings) == false) continue;

      modes[keys[i]].settings[keys2[j]] = difficultysettings[keys[i]][keys2[j]];

    }

    //if("settingsgui" in modes[keys[i]]){
    //  modes[keys[i]].settingsgui.init(modes[keys[i]])
    //}

  }

  currentmode = difficultysettings.currentmode;

  // Keep compatibility with renamed/removed modes saved in localStorage.
  if(Array.isArray(currentmode)){
    let filteredModes = [];

    for(var k = 0; k < currentmode.length; k++){
      if(modes[currentmode[k]] != undefined){
        filteredModes.push(currentmode[k]);
      }
    }

    if(filteredModes.length == 0){
      filteredModes = ["addition"];
    }

    currentmode = filteredModes;
  }
  else{
    currentmode = ["addition"];
  }
  problemmode = difficultysettings.problemmode;
  totaltime = difficultysettings.totaltime;
  totalproblems = difficultysettings.totalproblems;

}

function savedifficulty(){

  let difficultysettings = {};

  let savekeys = ["range1", "range2", "range3", "range", "nonummode", "secondsmode", "preset"]

  let keys = Object.keys(modes);

  for(var i = 0; i < keys.length; i++){

    let keys2 = Object.keys(modes[keys[i]].settings);

    for(var j = 0; j < keys2.length; j++){

      if(savekeys.indexOf(keys2[j]) == -1) continue;

      let value = modes[keys[i]].settings[keys2[j]];

      if(keys[i] in difficultysettings == false) difficultysettings[keys[i]] = {};

      difficultysettings[keys[i]][keys2[j]] = value;

    }

  }

  difficultysettings.currentmode = currentmode;
  difficultysettings.problemmode = problemmode;
  difficultysettings.totaltime = totaltime;
  difficultysettings.totalproblems = totalproblems;

  localStorage["currentversion"] = currentversion;
  localStorage["difficultysettings"] = JSON.stringify(difficultysettings);



}

function settab(tab){


  for(var i = 0; i < tabs.length; i++){

    if(tabs[i] != tab){
      document.getElementById(tabs[i]).style.display = "none";
    }
    else{
      document.getElementById(tabs[i]).style.display = "";
    }


  }

  currenttab = tab;



}

function switchtab(tab, doswitch=true){

  if(tab != "flashproblems"){
    let input = document.getElementById("template1input");
    if(input != null) input.blur();
  }

  currenttab = tab;

  for(var i = 0; i < tabs.length; i++){

    let btn = document.getElementById(tabs[i]+"button");

    if(tabs[i] == currenttab){
      if(btn.classList.contains("tabbuttonselected") == false) btn.classList.add("tabbuttonselected")
    }
    else{
      if(btn.classList.contains("tabbuttonselected")) btn.classList.remove("tabbuttonselected")
    }

  }

  if(doswitch) settab(tab);

  if(tab != "flashproblems"){
    window.scrollTo(0, 0);
  }


}

function init(){

  setTimeout( () => {
    document.body.style.opacity = "1";

  }, 500)

  setTimeout(() => {

    document.getElementById("iconlogo").style.opacity = "1";
    document.getElementById("iconlogo").style.bottom = "0px";


  }, 800)

  document.getElementById("options").style.display = "";


  if(modeselect == null){
    modeselect = "yarr";
    console.log("do eet");
    loaddifficulty();
    console.log("heree");
    modeinit();
    profilemodeinit();
  }
  else{
    savedifficulty();
  }

  if(themeselect == null){
    themeselect = "yarr";
    themeinit();
    changetheme(currenttheme);
  }

  if(cpmchart == null){
    initchart();
  }

  loadgeneralsettings();

  restarttest();

  profileinit();

  document.getElementById("finishscreen").style.display = "none"
  document.getElementById(currenttemplate).style.display = ""

  if(!voicemodeenabled){
    document.getElementById("voicesettings").disabled = true;
  }

  settemplate(currenttemplate);
  switchtab(currenttab);

  cpmtrack = [];
  rawcpmtrack = [];

}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
