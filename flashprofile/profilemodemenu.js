

let profilemodeselect = null;

function setprofilemodename(){

  let modelist = "";


  if(currentprofilemode.length > 2){
    clone = currentprofilemode.slice(0,2);
    clone.push("...");
    modelist = clone.join("<br>")
  }
  else{
    modelist = currentprofilemode.join("<br>")
  }

  document.getElementById("profilemodeselectbutton").innerHTML = modelist;


}

function profilemodeinit(){

  let keys = Object.keys(modes);
  let buttonelems = {};

  let modeselect = document.getElementById("profilemodeselect")

  setprofilemodename();

  for(var i = 0; i < keys.length; i++){

    if(modes[keys[i]].template != "template1equation") continue;

    let buttonelem = document.createElement("button");

    buttonelems[keys[i]] = buttonelem;

    buttonelem.classList.add("zulubutton");
    buttonelem.classList.add("modebutton");

    buttonelem.id = "profilemodebutton" + keys[i];

    buttonelem.innerHTML = keys[i];

    if(currentprofilemode.indexOf(keys[i]) > -1){
      buttonelem.classList.add("modeselected");
    }
    else{
      buttonelem.classList.remove("modeselected");
    }


    let num = i;

    buttonelem.onclick = () => {



      if(buttonelem.classList.contains("modeselected")){

        buttonelem.classList.remove("modeselected");
        let newmodes = [];
        for(var i = 0; i < currentprofilemode.length; i++){
          if(currentprofilemode[i] != keys[num]){
            newmodes.push(currentprofilemode[i]);
          }
        }
        newmodes = newmodes.sort();
        currentprofilemode = newmodes;

        if(currentprofilemode.length == 0){
          currentprofilemode = ["addition"];
          buttonelems["addition"].classList.add("modeselected");
        }

        //settemplate(modes[currentprofilemode[0]].template);
      }
      else{
        buttonelem.classList.add("modeselected");

        let mode = keys[num];
        let filtered = [mode];

        for(var i = 0; i < currentprofilemode.length; i++){
          if(modes[currentprofilemode[i]].template == modes[mode].template){
            filtered.push(currentprofilemode[i]);
          }
        }

        filtered = filtered.sort();

        for(var i = 0; i < currentprofilemode.length; i++){
          if(filtered.indexOf(currentprofilemode[i]) == -1 && buttonelems[currentprofilemode[i]].classList.contains("modeselected")){
            buttonelems[currentprofilemode[i]].classList.remove("modeselected")
          }
        }

        currentprofilemode = filtered;

        //settemplate(modes[mode].template);

      }
      //let current = document.getElementsByClassName("modeselected");
      //current[0].classList.remove("modeselected");


      setprofilemodename();
      makeprofilechart();



    }


    modeselect.appendChild(buttonelem);

  }


  let modecontainer = modeselect.parentElement;

  console.log(modecontainer);


}


function removeprofilemodefocus(event){

  if(event.target.classList.contains("modebutton")) return;

  let container = document.getElementById("profilemodecontainer");

  container.style.display = "none";


}

function showprofilemodeselect(){

  let container = document.getElementById("profilemodecontainer");

  container.style.display = "";


}
