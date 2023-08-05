var r = document.querySelector(':root');

let currenttheme = localStorage['theme'] || "default";
let themeselect = null;


let themes = {
  "default": {
    background: 'rgb(0,0,0)',
    button_background: 'rgb(35,35,35)',
    button_border: 'rgb(50,50,50)',
    window_background: 'rgb(20,20,20)',
    window_border: 'rgb(30,30,30)',
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(255,0,0)',
    display_color: 'rgb(255,255,255)',
    font_family: "Monospace",
  },
  "matrix": {
    background: 'rgb(0,0,0)',
    button_background: 'rgb(35,35,35)',
    button_border: 'rgb(50,50,50)',
    window_background: 'rgb(20,20,20)',
    window_border: 'rgb(30,30,30)',
    text_color: 'rgb(0,255,0)',
    text_select_color: 'rgb(255,0,0)',
    display_color: 'rgb(0,255,0)',
    font_family: "Monospace",
  },
  "sakura": {
    background: 'rgb(10,10,15)',
    button_background: 'rgb(35,35,35)',
    button_border: `rgb(${255*0.4},${77*0.4},${255*0.4})`,
    window_background: 'rgb(20,20,20)',
    window_border: `rgb(${255*0.2},${77*0.2},${255*0.2})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(255,77,255)',
    display_color: 'rgb(255,77,255)',
    font_family: "Arial",
  },
  "ocean": {
    background: 'rgb(10,10,35)',
    button_background: 'rgb(35,35,55)',
    button_border: `rgb(${0},${0},${255*0.4})`,
    window_background: 'rgb(20,20,40)',
    window_border: `rgb(${50},${50},${70})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(50,50,170)',
    display_color: 'rgb(50,50,170)',
    font_family: "Times New Roman",
  },
  "fire": {
    background: 'rgb(50,10,10)',
    button_background: 'rgb(50,35,35)',
    button_border: `rgb(${255*0.4},${0},${0})`,
    window_background: 'rgb(40,20,0)',
    window_border: `rgb(${100},${50},${00})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(170,50,50)',
    display_color: 'rgb(170,50,50)',
    font_family: "Times New Roman",
  }


}

function showthemeselect(){

  let container = document.getElementById("themecontainer");

  container.style.display = "";

}


function changetheme(theme){
  currenttheme = theme;
  localStorage['theme'] = currenttheme;
  settheme(currenttheme);

  console.log("here");

  let button = document.getElementById("themeselectbutton");
  button.innerHTML = theme;

  let text_color = themes[theme].display_color;

  button.style.color = `rgb(` + text_color[0] + ',' + text_color[1] + ',' + text_color[2] + ')'


  let container = document.getElementById("themecontainer");
  container.style.display = "none";
}

function themeinit(){

    let keys = Object.keys(themes);

    let themeselect = document.getElementById("themeselect")

    for(var i = 0; i < keys.length; i++){

      let num = i;

      let buttonelem = document.createElement("button");
      buttonelem.onclick =  () => {
        changetheme(keys[num])
      };


      buttonelem.classList.add("zulubutton");
      buttonelem.classList.add("themebutton");

      buttonelem.id = "themebutton" + keys[i];

      buttonelem.innerHTML = keys[i];

      let text_color = themes[keys[i]].display_color;

      buttonelem.style.color = text_color;

      let background = themes[keys[i]].background

      buttonelem.style.background = background

      let border = themes[keys[i]].background

      buttonelem.style.border = `solid 1px ` + border

      buttonelem.style.fontFamily = themes[keys[i]].font_family



      buttonelem.onmouseover = () => {

        settheme(keys[num])

      }

      themeselect.appendChild(buttonelem);

    }





}

function removethemefocus(event){

  if(event.target.id != "themecontainer") return;

  let container = document.getElementById("themecontainer");

  container.style.display = "none";

  settheme(currenttheme);

}

function settheme(theme){


  let keys = Object.keys(themes[theme]);

  for(var i = 0; i < keys.length; i++){

    let value = themes[theme][keys[i]];
    r.style.setProperty(`--${keys[i]}`, value)

  }

  makechart()

}