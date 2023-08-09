


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
    settings: {
      name: "division",

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
    settings: {
      name: "monthnum",

    }
  },
  "flash anzan":{

    template: "flashanzanequation"


  }
}

function init(){


  document.body.style.opacity = "1";

  let keys = Object.keys(modes);

  document.getElementById("options").style.display = "";

  //$('.problem').css('opacity', '0')

  //modes[currentmode].init();

  settemplate(currenttemplate);

  /*
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
  */

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

  restarttest(focus=false);

  document.getElementById("finishscreen").style.display = "none"
  document.getElementById(currenttemplate).style.display = ""

  cpmtrack = [];
  rawcpmtrack = [];

}
