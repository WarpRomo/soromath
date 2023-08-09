
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


let flashstuff = {
  start: null,
  restart: null,
  input: null,
  inputrestart: null
}

function setanzansliders(){
  document.getElementById("flashdigitamount").value = flashnumdigits;
  document.getElementById("flashnumamount").value = flashnumproblems;
  document.getElementById("flashspeedamount").value = flashtime / 100;

}

function getanzansliders(){

  flashnumdigits = document.getElementById("flashdigitamount").value
  flashnumproblems = document.getElementById("flashnumamount").value
  flashtime = document.getElementById("flashspeedamount").value * 100
  flashanzaninit(false);

}

function setanzantext(){
  document.getElementById("flashdigittext").innerHTML =  flashnumdigits;
  document.getElementById("flashnumtext").innerHTML = flashnumproblems;
  document.getElementById("flashspeedtext").innerHTML = (flashtime / 1000) + "s";
}

let flashinit = null;
function flashanzaninit(){

  flashstuff.start = document.getElementById("flashstart");
  flashstuff.restart = document.getElementById("flashrestart");
  flashstuff.input = document.getElementById("flashinput");
  flashstuff.inputrestart = document.getElementById("flashinputrestart");

  document.getElementById("difficultyoption").style.display = "none";
  document.getElementById("flashoption").style.display = "";

  if(flashinit == null){
    setanzansliders();
    flashinit = true;
  }
  setanzantext();



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

  console.log("HERE");

  flashrestart(false);
  document.getElementById("flashoption").style.display = "none";


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

      if(flashnumindex == flashnumproblems){

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
        }, flashtime / 3);


        flashnumindex++;
      }


    }, flashtime)
  }, flashstartdelay)



}

function flashinput(event){

  if(event.key == "Enter"){

    let input = document.getElementById("flashinput");

    let numinput = parseInt(input.value);

    flashstuff.input.disabled = true

    document.getElementById("flashtext").innerHTML = flashcount;

    console.log(flashcount, numinput)

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

  return Math.floor(Math.random() * (10**flashnumdigits - 10**(flashnumdigits - 1)) + 10**(flashnumdigits - 1));


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
