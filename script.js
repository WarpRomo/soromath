const synth = window.speechSynthesis;


let tabs = ["flashproblems", "flashprofile"];
let currenttab = "flashproblems";

let currentmode = ["addition"];
let currenttemplate = "template1equation";
let currentdifficulty = 0;

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
  "addition": {
    id: "additionequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: addaddition,
    ontype: additiontype,
    getanswer: additionanswer,
    validate: additionvalidate,
    speechText: additionspeech,
    settings: {
      name: "addition",

    }
  },
  "multiplication":{
    id: "multequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: addmult,
    ontype: multtype,
    getanswer: multanswer,
    validate: multvalidate,
    speechText: multspeech,
    settings: {
      name: "mult",

    }
  },
  "subtraction": {
    id: "subtractionequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: addsubtraction,
    ontype: subtractiontype,
    getanswer: subtractionanswer,
    validate: subtractionvalidate,
    speechText: subtractionspeech,
    settings: {
      name: "subtraction"
    }
  },
  "division":{
    id: "divisionequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: adddivision,
    ontype: divisiontype,
    getanswer: divisionanswer,
    validate: divisionvalidate,
    speechText: divisionspeech,
    settings: {
      name: "division",

    }
  },
  "fraction addition":{
    id: "fractionequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: addfraction,
    ontype: fractiontype,
    getanswer: fractionanswer,
    validate: fractionvalidate,
    speechText: fractionspeech,
    settings: {
      name: "fraction",
      offset: "-109px"
    }
  },
  "exponents":{
    id: "powerequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: addpower,
    ontype: powertype,
    getanswer: poweranswer,
    validate: powervalidate,
    speechText: powerspeech,
    settings: {
      name: "power",
      offset: "-110px",

    }
  },
  "trigonometry":{
    id: "trigequation",
    diffs: [0],
    template: "template1equation",
    addproblem: addtrig,
    ontype: trigtype,
    getanswer: triganswer,
    validate: trigvalidate,
    speechText: trigspeech,
    settings: {
      name: "trig",
      offset: "-109px"
    }
  },
  "celsius to fahrenheit":{
    id: "celctofequation",
    diffs: [0,1,2],
    template: "template1equation",
    addproblem: addcelctof,
    ontype: celctoftype,
    getanswer: celctofanswer,
    validate: celctofvalidate,
    speechText: celctofspeech,
    settings: {
      name: "celctof"
    }
  },
  "month to number":{
    id: "monthnumequation",
    diffs: [0],
    template: "template1equation",
    addproblem: addmonthnum,
    ontype: monthnumtype,
    getanswer: monthnumanswer,
    validate: monthnumvalidate,
    speechText: monthnumspeech,
    settings: {
      name: "monthnum",

    }
  },
  "flash anzan":{

    template: "flashanzanequation"


  }
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
