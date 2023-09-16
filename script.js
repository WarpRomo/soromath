const synth = window.speechSynthesis;


let tabs = ["flashproblems", "flashprofile"];
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
  "C° to F°": celctofpreset,
  "F° to C°": ftocelcpreset,
  "month to number": monthnumpreset,
  "date to day of week": calendarpreset,
  "flash anzan": flashanzanpreset
}


function loaddifficulty(){

  if(localStorage["difficultysettings"] == undefined){

    savedifficulty();

  }

  let difficultysettings = JSON.parse(localStorage["difficultysettings"]);

  let keys = Object.keys(difficultysettings);

  for(var i = 0; i < keys.length; i++){

    let keys2 = Object.keys(difficultysettings[keys[i]]);

    for(var j = 0; j < keys2.length; j++){

      modes[keys[i]].settings[keys2[j]] = difficultysettings[keys[i]][keys2[j]];

    }

    if("settingsgui" in modes[keys[i]]){
      modes[keys[i]].settingsgui.init(modes[keys[i]])
    }

  }


}

function savedifficulty(){

  let difficultysettings = {};

  let savekeys = ["range1", "range2", "range", "nonummode"]

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


}

function init(){


  document.body.style.opacity = "1";

  let keys = Object.keys(modes);

  document.getElementById("options").style.display = "";

  settemplate(currenttemplate);

  switchtab(currenttab);


  if(modeselect == null){
    modeselect = "yarr";
    modeinit();
    profilemodeinit();
    loaddifficulty();
  }
  savedifficulty();

  if(themeselect == null){
    themeselect = "yarr";
    themeinit();
    changetheme(currenttheme);
  }

  if(cpmchart == null){
    initchart();
  }

  restarttest(focus=false);

  profileinit();

  document.getElementById("finishscreen").style.display = "none"
  document.getElementById(currenttemplate).style.display = ""

  if(!voicemodeenabled){
    document.getElementById("voicesettings").disabled = true;
  }

  cpmtrack = [];
  rawcpmtrack = [];

}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
