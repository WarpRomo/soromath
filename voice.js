
let voicemodeenabled = false;

function voicemodeclick(){

  let button = document.getElementById("voicebutton");


  voicemodeenabled = !voicemodeenabled;

  if(voicemodeenabled){

    button.innerHTML = "voice mode: on";
    button.classList.add("textselected");

    setTimeout(() => {

      synthesisvoice("Voice mode is now on.")

    })


    document.getElementById("problemscontainer").style.display = "none";
    document.getElementsByClassName("numrestart")[0].style.left = "0%";
    document.getElementsByClassName("inputexample")[0].style.left = "0%";
    document.getElementById("voicemodetext").style.display = "";

    init();

  }
  else{

    if (synth.speaking) {
      synth.cancel();
    }

    init();

    button.innerHTML = "voice mode: off";
    button.classList.remove("textselected");

    document.getElementById("problemscontainer").style.display = "";
    document.getElementsByClassName("numrestart")[0].style.left = "50%";
    document.getElementsByClassName("inputexample")[0].style.left = "50%";
    document.getElementById("voicemodetext").style.display = "none";

  }


}


function synthesisvoice(text, rate=1.2){

  let voices = synth.getVoices();

  const utterThis = new SpeechSynthesisUtterance(text);


  for(var i = 0; i < voices.length; i++){

    if(voices[i] == "en-US"){
      utterThis.voice = voices[i];
    }


  }

  utterThis.rate = rate;


  if (synth.speaking) {
    synth.cancel();
  }

  console.log("SPEAK");

  synth.speak(utterThis);

}
