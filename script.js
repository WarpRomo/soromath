
let problemindex = 0;
let problemlist = [];
let stats = [0,0];

let totaltime = 15000;
let teststarted = false;
let testcheckend = null;

let currentinit = additioninit;
let currentmode = "addition";
let currentdifficulty = 0;

let modes = {
  "addition": {
    init: additioninit,
    id: "additionequation",
    diffs: [0,1,2],
    template: "template1equation",
    settings: {
      name: "addition"
    }
  },
  "multiplication":{
    init:multinit,
    id: "multequation",
    diffs: [0,1,2],
    template: "template1equation",
    settings: {
      name: "mult"
    }
  },
  "subtraction": {
    init: subtractioninit,
    id: "subtractionequation",
    diffs: [0,1,2],
    template: "template1equation",
    settings: {
      name: "subtraction"
    }
  },
  "division":{
    init:divisioninit,
    id: "divisionequation",
    diffs: [0,1,2],
    template: "template1equation",
    settings: {
      name: "division"
    }
  },
  "exponents":{
    init:powerinit,
    id: "powerequation",
    diffs: [0,1,2],
    template: "template1equation",
    settings: {
      name: "power",
      offset: "-110px"
    }
  },
  "trigonometry":{
    init: triginit,
    id: "trigequation",
    diffs: [0],
    template: "template1equation",
    settings: {
      name: "trig",
      offset: "-109px"
    }
  },
  "celsius to fahrenheit":{
    init: celctofinit,
    id: "celctofequation",
    diffs: [0,1,2],
    template: "template1equation",
    settings: {
      name: "celctof"
    }
  },
  "month to number":{
    init: monthnuminit,
    id: "monthnumequation",
    diffs: [0],
    template: "template1equation",
    settings: {
      name: "monthnum"
    }
  }
}

function init(){


  document.body.style.opacity = "1";

  let keys = Object.keys(modes);

  document.getElementById("options").style.display = "";

  //$('.problem').css('opacity', '0')

  modes[currentmode].init();



  if(currentdifficulty >= modes[currentmode].diffs.length){

    setdifficulty(modes[currentmode].diffs.length-1);

  }

  for(var i = 0; i < difficultybuttons.length; i++){

    let button = document.getElementById(difficultybuttons[i])

    if(modes[currentmode].diffs.indexOf(i) == -1){

      button.disabled = true;

    }
    else{
      button.disabled = false;
    }


  }


  if(modeselect == null){
    modeselect = "yarr";
    modeinit();
  }

  if(themeselect == null){
    themeselect = "yarr";
    themeinit();
    changetheme(currenttheme);
  }

  if(cpmchart == null){
    initchart();
  }

  document.getElementById("finishscreen").style.display = "none"

  cpmtrack = [];
  rawcpmtrack = [];

}
