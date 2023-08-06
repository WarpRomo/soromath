function setmode(mode){

}


let modeselect = null;
function modeinit(){

  let keys = Object.keys(modes);

  let modeselect = document.getElementById("modeselect")

  for(var i = 0; i < keys.length; i++){

    let buttonelem = document.createElement("button");
    buttonelem.onclick = `setmode(${keys[i]})`;


    buttonelem.classList.add("zulubutton");
    buttonelem.classList.add("modebutton");

    buttonelem.id = "modebutton" + keys[i];

    buttonelem.innerHTML = keys[i];

    if(keys[i] == currentmode){
      buttonelem.classList.add("modeselected");
    }
    else{
      buttonelem.classList.remove("modeselected");
    }


    let num = i;

    buttonelem.onclick = () => {


      let container = document.getElementById("modecontainer");
      container.style.display = "none";

      currentmode = keys[num];

      let current = document.getElementsByClassName("modeselected");
      current[0].classList.remove("modeselected");

      buttonelem.classList.add("modeselected");


      document.getElementById("modeselectbutton").innerHTML = keys[num];




      init();





    }


    modeselect.appendChild(buttonelem);

  }





}


function removemodefocus(event){

  if(event.target.id != "modecontainer") return;

  let container = document.getElementById("modecontainer");

  container.style.display = "none";

}

function showmodeselect(){

  let container = document.getElementById("modecontainer");

  container.style.display = "";

}
