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


let buttonelems = {};
let modesettingopen = null;

let firstmodeinit = false;

function modeinit(){

  let keys = Object.keys(modes);

  let modeselect = document.getElementById("modeselect")

  let innersetting = document.getElementById("modesettingsback");
  let innersettingbutton = document.getElementById("modesettingsbutton");

  innersettingbutton.appendChild(innersetting)

  setmodename();

  for(var i = 0; i < keys.length; i++){

    let num = i;
    let parentDiv = document.createElement("div");
    let buttonelem = document.createElement("button");
    let buttontext = document.createElement("p");

    parentDiv.classList.add("modesettingsbuttonparent")

    buttonelems[keys[i]] = buttonelem;

    buttonelem.onclick = `setmode(${keys[i]})`;


    buttonelem.classList.add("zulubutton");
    buttonelem.classList.add("modebutton");

    buttonelem.id = "modebutton" + keys[i];

    buttontext.innerHTML = keys[i];
    buttonelem.appendChild(buttontext);

    if(modes[keys[i]].settings != undefined && modes[keys[i]].settings.preset != undefined){
      buttontext.innerHTML += " (" + modes[keys[i]].settings.preset + ")";
    }

    if(currentmode.indexOf(keys[i]) > -1){
      buttonelem.classList.add("modeselected");
    }
    else{
      buttonelem.classList.remove("modeselected");
    }


    buttonelem.onclick = (e) => {

      if(e.target.classList.contains("modesettingsenter") || e.target.src != undefined) return;


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

        if(currentmode.length == 0){
          currentmode = ["addition"];
          buttonelems["addition"].classList.add("modeselected");
        }

        settemplate(modes[currentmode[0]].template);
      }
      else{
        buttonelem.classList.add("modeselected");

        let mode = keys[num];
        let filtered = [mode];

        for(var i = 0; i < currentmode.length; i++){
          if(modes[currentmode[i]].template == modes[mode].template){
            filtered.push(currentmode[i]);
          }
        }

        filtered = filtered.sort();

        for(var i = 0; i < currentmode.length; i++){
          if(filtered.indexOf(currentmode[i]) == -1 && buttonelems[currentmode[i]].classList.contains("modeselected")){
            buttonelems[currentmode[i]].classList.remove("modeselected")
          }
        }

        currentmode = filtered;

        settemplate(modes[mode].template);

      }
      //let current = document.getElementsByClassName("modeselected");
      //current[0].classList.remove("modeselected");


      if(currenttemplate == "template1equation"){
        restarttest(false);
      }

      setmodename();



    }
    parentDiv.appendChild(buttonelem);

    if(modes[keys[num]].settingsgui != undefined){
      let settingsButton = document.createElement("button");

      settingsButton.classList.add("zulubutton");
      settingsButton.classList.add("modesettingsenter");

      let settingsImage = document.createElement("img");
      settingsImage.src = "images/settings.png";
      settingsImage.classList.add("modesettingsimage");


      settingsButton.appendChild(settingsImage);

      settingsButton.onclick = () => {

        document.getElementById("modesettings").style.display = "";
        document.getElementById("modesettings").scrollTop = 0;

        let modesettingscontainer = document.getElementById("modesettingsbuttoncontainer")
        let modesettingsback = document.getElementById("modesettingsback");
        let modesettingssection = document.getElementById("modesettingssection");
        let modesettingsbutton = document.getElementById("modesettingsbutton");
        let modeselect = document.getElementById("modeselect");

        console.log(modesettingscontainer);

        modesettingopen = keys[num]

        modesettingssection.innerHTML = "";
        modes[keys[num]].settingsgui.init(modes[keys[num]]);

        let offset = buttonelem.offsetTop - modeselect.scrollTop;

        buttonelem.parentElement.style.opacity = 0;
        modesettingsbuttoncontainer.style.top = offset + "px";

        let animTime = 300;


        $(modesettingssection).animate({

          opacity: 1

        }, animTime)

        $(modesettingscontainer).animate({

          top: 0+"px"//(modesettingscontainer.parentElement.offsetHeight - buttonelem.offsetHeight - 10) + "px",

        }, animTime, "easeOutQuad")

        modesettingsbutton.onclick = () => {

          modesettingopen = null;

          let offset = buttonelem.offsetTop - modeselect.scrollTop + document.getElementById("modesettings").scrollTop;

          console.log(offset);

          $(modesettingssection).animate({

            opacity: 0

          }, animTime)

          $(modesettingscontainer).animate({

            top: offset + "px",

          }, animTime, "easeOutQuad", () => {

            buttonelem.parentElement.style.opacity = "";
            document.getElementById("modesettings").style.display = "none";

          })

        }


      }

      parentDiv.appendChild(settingsButton)

    }


    modeselect.appendChild(parentDiv);

  }


  let modecontainer = modeselect.parentElement;

  console.log(modecontainer);

  firstmodeinit = true;

  customtimedone(false)


}


function removemodefocus(event){

  console.log(event.target);

  if(event.target.id != "modecontainer") return;

  if(modesettingopen != null){
    let modesettingsback = document.getElementById("modesettingsbutton");
    modesettingsback.onclick()
  }

  let container = document.getElementById("modecontainer");

  templates[currenttemplate].init()

  container.style.display = "none";

  document.body.classList.remove("noscroll");

  $(".modesettingsenter").removeClass("modesettingsenteropen")



}

function showmodeselect(){

  let container = document.getElementById("modecontainer");

  container.style.display = "";

  console.log("YO");


  document.body.classList.add("noscroll");


  templates[currenttemplate].init()

  setTimeout(() => {
    $(".modesettingsenter").addClass("modesettingsenteropen")
  }, 1)


}
