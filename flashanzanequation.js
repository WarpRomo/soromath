
let flashnumdigits = 1;
let flashnumproblems = 7;
let flashtime = 700;
let flashstartdelay = 800;

let flashinterval = null;
let flashtimeout = null;
let flashnumtimeout = null;
let flashfinishtimeout = null;

let flashnumindex = 0;
let flashcount = 0;
let flashsound = new Audio("./flashanzaneqs/anzanclick.wav");
let flashcorrect = new Audio("./flashanzaneqs/anzancorrect.wav");
let flashwrong = new Audio("./flashanzaneqs/anzanwrong.wav");

let defaulttext = "...";
let waitingtext = "-";

let defaultdigits = "Amount of digits"
let defaultnumbers = "Amount of numbers"
let defaultspeed = "Flash speed"


let flashanzanpreset = {

  template: "flashanzanequation",
  settings:{
    speed: 0.7,
    amount: 10,
    range: [0, 9]
  },
  settingsgui: {

    init: basicpresetgen3range("Speed", "Number Amount", "Number Range")

  }


}

function basicpresetgen3range(range1label, range2label, range3label){
  return (self, changegui=true) => {basicpreset3range(self, range1label, range2label, range3label, changegui)}
}

function basicpreset3range(self, range1label, range2label, range3label, changegui){
  let modesettingsbutton = document.getElementById("modesettingsbutton")
  let modesettingssection = document.getElementById("modesettingssection");

  if(!changegui){
    modesettingsbutton = document.createElement("div");
    modesettingssection = document.createElement("div");
  }

  let fullParent = document.createElement("div");
  fullParent.style.display = "flex";
  fullParent.style.flexDirection = "column";
  fullParent.style.alignItems = "center";

  let numRange = document.createElement("p");
  numRange.innerHTML = range1label;
  numRange.classList.add("settinglabel");
  numRange.style.marginTop = "20px";

  let numRange2 = document.createElement("p");
  numRange2.innerHTML = range2label;
  numRange2.classList.add("settinglabel");
  numRange2.style.marginTop = "20px";

  let numRange3 = document.createElement("p");
  numRange3.innerHTML = range3label;
  numRange3.classList.add("settinglabel");
  numRange3.style.marginTop = "20px";


  function makeinput(){

    let input1 = document.createElement("input")
    input1.style.margin = "7px";
    input1.classList.add("numinput");

    return input1;

  }

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

  let input1 = makeinput();
  let input2 = makeinput();
  let range = makeinputrange();

  input1.value = self.settings.speed;
  input2.value = self.settings.amount;

  input1.oninput = () => {

    let allowed = "0123456789.";
    let filtered = "";

    for(var i = 0; i < input1.value.length; i++){
      if(allowed.indexOf(input1.value[i]) != -1) filtered += input1.value[i];
    }

    input1.value = filtered;


  }
  input1.onblur = () => {

    let val = parseFloat(input1.value);

    if(val+"" == "NaN"){
      val = 0.3;
    }
    if(val < 0.02){
      val = 0.02;
    }

    input1.value = val;
    self.settings.speed = val;

    //flashanzaninit();

  }

  input2.oninput = () => {

    let allowed = "0123456789";
    let filtered = "";

    for(var i = 0; i < input2.value.length; i++){
      if(allowed.indexOf(input2.value[i]) != -1) filtered += input2.value[i];
    }

    input2.value = filtered;


  }
  input2.onblur = () => {

    let val = parseFloat(input2.value);

    if(val+"" == "NaN" || val <= 0){
      val = 1;
    }

    input2.value = val;
    self.settings.amount = val;

    //flashanzaninit();

  }


  range[1].value = self.settings.range[0];
  range[2].value = self.settings.range[1];
  range[1].oninput = () => { oninput(range[1])}
  range[2].oninput = () => { oninput(range[2])}
  range[1].onblur = () => {self.settings.range[0] = onblur(range[1]); swap(range[1], range[2]);  }
  range[2].onblur = () => {self.settings.range[1] = onblur(range[2]); swap(range[1], range[2]);  }
  self.settingsgui.range = range;

  fullParent.appendChild(numRange);
  fullParent.appendChild(input1);

  fullParent.appendChild(numRange2);
  fullParent.appendChild(input2);

  fullParent.appendChild(numRange3);
  fullParent.appendChild(range[0])

  modesettingssection.appendChild(fullParent);

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

  modesettingsbutton.children[0].innerHTML = "flash anzan"
  self.settingsgui.doneinit = true;

}



let flashstuff = {
  start: null,
  restart: null,
  input: null,
  inputrestart: null
}

let flashinit = null;
function flashanzaninit(){

  flashstuff.start = document.getElementById("flashstart");
  flashstuff.restart = document.getElementById("flashrestart");
  flashstuff.input = document.getElementById("flashinput");
  flashstuff.inputrestart = document.getElementById("flashinputrestart");

  document.getElementById("difficultyoption").style.display = "none";
  //document.getElementById("flashoption").style.display = "";

  flashstuff.input.value = "";
  flashstuff.input.disabled = false;

  flashnumindex = 0;
  flashnumindex = 0;
  flashcount = 0;

  document.getElementById("flashtext").innerHTML = defaulttext;

  flashstuff.start.style.display = "";
  flashstuff.inputrestart.style.display = "none";
  flashstuff.input.style.display = "none";
  flashstuff.restart.style.display = "none"

  if(flashtimeout != null) clearTimeout(flashtimeout);
  if(flashinterval != null) clearInterval(flashinterval);
  if(flashnumtimeout != null) clearTimeout(flashnumtimeout);
  if(flashfinishtimeout != null) clearTimeout(flashfinishtimeout);


}

function flashanzanswitch(){


  flashrestart(false);
  //document.getElementById("flashoption").style.display = "none";


}

function flashrestart(focus=true){
  flashanzaninit();
  if(focus) setTimeout( () => flashstuff.start.focus(), 100 );
}

function flashstart(){

  flashstuff.inputrestart.style.display = "";
  flashstuff.start.style.display = "none";
  flashstuff.restart.style.display = "";
  setTimeout( () => flashstuff.restart.focus(), 100 );

  let numelem = document.getElementById("flashtext");
  numelem.innerText = waitingtext

  flashtimeout = setTimeout(() => {
    flashinterval = setInterval(() => {

      let numbers = flashgennumber();

      if(flashnumindex == flashanzanpreset.settings.amount){

        flashstuff.input.style.display = "";

        setTimeout( () => flashstuff.input.focus(), 100 );

        numelem.innerHTML = waitingtext

        clearInterval(flashinterval);

      }
      else{
        flashcount += numbers;

        numelem.innerHTML = "<br>"

        flashnumtimeout = setTimeout(() => {
          let sound = flashsound.cloneNode()
          sound.volume = 0.2
          sound.play()
          numelem.innerHTML = numbers;
        }, flashtime / 5);


        flashnumindex++;
      }


    }, flashanzanpreset.settings.speed * 1000)
  }, flashstartdelay)



}

function flashinput(event){

  if(event.key == "Enter"){

    let input = document.getElementById("flashinput");

    let numinput = parseInt(input.value);

    flashstuff.input.disabled = true

    document.getElementById("flashtext").innerHTML = flashcount;

    if(numinput == flashcount){
      let correct = flashcorrect.cloneNode();
      correct.volume = 0.25
      correct.play()
      $(flashstuff.input).parent().effect( "shake", { direction: "up", times: 1, distance: 10}, 700 );

    }
    else{

      let wrong = flashwrong.cloneNode()
      wrong.volume = 0.25
      wrong.play()
      $(flashstuff.input).parent().effect( "shake", { direction: "horizontal", times: 2, distance: 5}, 400 );

    }

    let flashfinishtimeout = setTimeout(() => {

      flashanzaninit();
      setTimeout( () => flashstuff.start.focus(), 100 );


    }, 1000)


  }


}


function flashgennumber(){

  let num1 = flashanzanpreset.settings.range[0];
  let num2 = flashanzanpreset.settings.range[1];

  return Math.floor(Math.random() * (num2 - num1 + 1) ) + num1;

}


function showflashanzan(){

  let container = document.getElementById("flashcontainer");

  container.style.display = "";

}

function removeanzanfocus(event, bypass=false){

  let container = document.getElementById("flashcontainer");

  if(!bypass && event.target.id != "flashcontainer") return;

  container.style.display = "none";

}
