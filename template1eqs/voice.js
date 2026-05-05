
let voicemodeenabled = false;
let voicerate = 1;
let voicevolume = 1;
let voiceshowprevious = true;

function applyvoiceproblemlayout(){
  let showproblems = !voicemodeenabled || voiceshowprevious;

  let problemscontainer = document.getElementById("problemscontainer");
  let numrestart = document.getElementsByClassName("numrestart")[0];
  let lastcorrection = document.getElementById("lastcorrection");
  let voicemodetext = document.getElementById("voicemodetext");

  if(problemscontainer != null){
    problemscontainer.style.display = showproblems ? "" : "none";
  }

  if(numrestart != null){
    numrestart.style.left = showproblems ? "50%" : "0%";
  }

  if(lastcorrection != null){
    lastcorrection.style.left = showproblems ? "50%" : "0%";
  }

  if(voicemodetext != null){
    voicemodetext.style.display = showproblems ? "none" : "";
  }
}

function setvoiceshowprevious(value){
  voiceshowprevious = value === true;
  localStorage["voiceshowprevious"] = voiceshowprevious ? "1" : "0";
  applyvoiceproblemlayout();
}

function loadvoicesettings(){
  if(localStorage["voiceshowprevious"] != undefined){
    voiceshowprevious = localStorage["voiceshowprevious"] == "1";
  }
}


function voicemodeclick(yarr=true){

  let button = document.getElementById("voicebutton");


  voicemodeenabled = !voicemodeenabled;

  if(voicemodeenabled){

    button.innerHTML = "voice mode: on";
    button.classList.add("textselected");

    setTimeout(() => {

      synthesisvoice("Voice mode is now on.")

    })


    applyvoiceproblemlayout();
    document.getElementById("voicerestart").style.display = ""
    document.getElementById("voicesettings").disabled = false;

    init();

  }
  else{

    if (synth.speaking) {
      synth.cancel();
    }

    init();

    button.innerHTML = "voice mode: off";
    button.classList.remove("textselected");

    applyvoiceproblemlayout();
    document.getElementById("voicerestart").style.display = "none"
    document.getElementById("voicesettings").disabled = true;

  }


}

function voicesettingsclick(){

}


function voiceinit(doinit=false){
  loadvoicesettings();
  setvoicesliders(doinit);

  let previouscheckbox = document.getElementById("voiceshowprevious");
  if(previouscheckbox != null){
    previouscheckbox.checked = voiceshowprevious;
  }

  applyvoiceproblemlayout();
}

function getvoicesliders(){
  voicerate = 1 + document.getElementById("voicespeedslider").value / 3;
  voicevolume = document.getElementById("voicevolumeslider").value / 7;
}

function setvoicesliders(doinit){
  document.getElementById("voicespeedslider").value = (voicerate - 1)*3;
  document.getElementById("voicevolumeslider").value = Math.round((voicevolume)*7);
}

function removevoicecontainer(event, bypass){

  if(!bypass && event.target.id != "voicecontainer") return

  document.getElementById("voicecontainer").style.display = "none";
  init();


}

function showvoicecontainer(){

  document.getElementById("voicecontainer").style.display = "";

}


function synthesisvoice(text){

  let voices = synth.getVoices();

  const utterThis = new SpeechSynthesisUtterance(text);


  for(var i = 0; i < voices.length; i++){

    if(voices[i] == "en-US"){
      utterThis.voice = voices[i];
    }


  }

  console.log(voicevolume);

  utterThis.rate = voicerate;
  utterThis.volume = voicevolume;


  if (synth.speaking) {
    synth.cancel();
  }

  console.log("SPEAK");

  synth.speak(utterThis);

}
