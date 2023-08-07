function setmode(mode){

}


let modeselect = null;

function setmodename(){

  let modelist = "";


  if(currentmode.length > 2){
    clone = currentmode.slice(0,2);
    clone.push("...");
    modelist = clone.join("<br>")
  }
  else{
    modelist = currentmode.join("<br>")
  }

  document.getElementById("modeselectbutton").innerHTML = modelist;


}

function modeinit(){

  let keys = Object.keys(modes);
  let buttonelems = {};

  let modeselect = document.getElementById("modeselect")

  setmodename();

  for(var i = 0; i < keys.length; i++){

    let buttonelem = document.createElement("button");

    buttonelems[keys[i]] = buttonelem;

    buttonelem.onclick = `setmode(${keys[i]})`;


    buttonelem.classList.add("zulubutton");
    buttonelem.classList.add("modebutton");

    buttonelem.id = "modebutton" + keys[i];

    buttonelem.innerHTML = keys[i];

    if(currentmode.indexOf(keys[i]) > -1){
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
        for(var i = 0; i < currentmode.length; i++){
          if(currentmode[i] != keys[num]){
            newmodes.push(currentmode[i]);
          }
        }
        newmodes = newmodes.sort();
        currentmode = newmodes;
      }
      else{
        buttonelem.classList.add("modeselected");
        currentmode.push(keys[num]);
      }
      //let current = document.getElementsByClassName("modeselected");
      //current[0].classList.remove("modeselected");



      if(currentmode.length == 0){
        currentmode = ["addition"];
        buttonelems["addition"].classList.add("modeselected");
      }

      setmodename();
      init();



    }


    modeselect.appendChild(buttonelem);

  }





}


function removemodefocus(event){

  if(event.target.classList.contains("modebutton")) return;

  let container = document.getElementById("modecontainer");

  container.style.display = "none";

}

function showmodeselect(){

  let container = document.getElementById("modecontainer");

  container.style.display = "";

  init();

}
