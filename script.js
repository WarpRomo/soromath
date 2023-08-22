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
  "fraction addition": fractionpreset,
  "exponents": powerpreset,
  "Nth Roots": rootpreset,
  "linear equations": linearpreset,
  "trigonometry":trigpreset,
  "C° to F°": celctofpreset,
  "month to number": monthnumpreset,
  "flash anzan": flashanzanpreset
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
  }

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
