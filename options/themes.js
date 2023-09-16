var r = document.querySelector(':root');


let themes = [
  {
    background: 'rgb(0,0,0)',
    button_background: 'rgb(35,35,35)',
    button_border: 'rgb(50,50,50)',
    window_background: 'rgb(20,20,20)',
    window_border: 'rgb(30,30,30)',
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(255,0,0)',
    display_color: 'rgb(255,255,255)',
    font_family: "Arial",
    name: "default",
  },{
    background: 'rgb(0,0,0)',
    button_background: 'rgb(35,35,35)',
    button_border: 'rgb(50,60,50)',
    window_background: 'rgb(20,20,20)',
    window_border: 'rgb(30,40,30)',
    text_color: 'rgb(0,255,0)',
    text_select_color: 'rgb(255,0,0)',
    display_color: 'rgb(0,255,0)',
    font_family: "Monospace",
    name: "matrix"
  },{
    background: 'rgb(10,10,15)',
    button_background: 'rgb(35,35,35)',
    button_border: `rgb(${255*0.4},${77*0.4},${255*0.4})`,
    window_background: 'rgb(20,20,20)',
    window_border: `rgb(${255*0.2},${77*0.2},${255*0.2})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(255,77,255)',
    display_color: 'rgb(255,77,255)',
    font_family: "Arial",
    name: "sakura"
  },{
    background: `rgb(${0*0.1},${77*0.05},${0*0.1})`,
    button_background: `rgb(${0*0.3},${77*0.3},${0*0.3})`,
    button_border: `rgb(${0*0.4},${77*0.4},${0*0.4})`,
    window_background: `rgb(${0*0.2},${77*0.2},${0*0.2})`,
    window_border: `rgb(${0*0.2},${77*0.2},${0*0.2})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(0,255,0)',
    display_color: 'rgb(0,255,0)',
    font_family: "Cursive",
    name: "lime",
  },{
    background: 'rgb(10,10,35)',
    button_background: 'rgb(35,35,55)',
    button_border: `rgb(${0},${0},${255*0.4})`,
    window_background: 'rgb(20,20,40)',
    window_border: `rgb(${50},${50},${70})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(50,50,170)',
    display_color: 'rgb(50,50,170)',
    font_family: "Times New Roman",
    name: "ocean",
  },{
    background: 'rgb(50,10,10)',
    button_background: 'rgb(50,35,35)',
    button_border: `rgb(${255*0.4},${0},${0})`,
    window_background: 'rgb(40,20,0)',
    window_border: `rgb(${100},${50},${00})`,
    text_color: 'rgb(255,255,255)',
    text_select_color: 'rgb(170,50,50)',
    display_color: 'rgb(170,50,50)',
    font_family: "Times New Roman",
    name: "fire"
  },{
      background: 'rgb(0,0,0)',
      button_background: 'rgb(35,35,35)',
      button_border: 'rgb(50,50,50)',
      window_background: 'rgb(20,20,20)',
      window_border: 'rgb(30,30,30)',
      text_color: 'rgb(255,255,255)',
      text_select_color: 'rgb(100,100,100)',
      display_color: 'rgb(255,255,255)',
      font_family: "Arial",
      name: "shadow"
  },
]

let currenttheme = themes[0];

try{
  if(localStorage.getItem('theme') != null) currenttheme = JSON.parse(localStorage.getItem('theme'));
}
catch(err){}


let themeselect = null;




let themecustompresets = [];
try{
  if(themecustompresets != null) themecustompresets = JSON.parse(localStorage['customthemes']);
}
catch(err){}

let themeediting = {};
let themeeditingindex = -1;

function showthemeselect(){

  let container = document.getElementById("themecontainer");

  container.style.display = "";

  document.body.classList.add("noscroll");

}


function matchcurrenttheme(){

  let keys = Object.keys(currenttheme);

  let k1 = Object.keys(themes);

  L: for(var i = 0; i < k1.length; i++){

    for(var j = 0; j < keys.length; j++){

      if(themes[k1[i]][keys[j]] != currenttheme[keys[j]]) continue L;

    }

    console.log("FOUND MATCH", themes[k1[i]].name)

    currenttheme = themes[k1[i]];
    return;

  }

  k1 = Object.keys(themecustompresets);

  L: for(var i = 0; i < k1.length; i++){

    for(var j = 0; j < keys.length; j++){

      if(themecustompresets[k1[i]][keys[j]] != currenttheme[keys[j]]) continue L;

    }

    console.log("FOUND MATCH", themecustompresets[k1[i]].name)

    currenttheme = themecustompresets[k1[i]];
    return;

  }


}

function savethemelocal(){
  localStorage.setItem('theme', JSON.stringify(currenttheme));
  localStorage.setItem('customthemes', JSON.stringify(themecustompresets));
}

function changetheme(theme,hidescreen=true){

  currenttheme = theme;

  localStorage.setItem('theme', JSON.stringify(currenttheme));

  console.log("SET THAT");

  localStorage.setItem('customthemes', JSON.stringify(themecustompresets));

  settheme(currenttheme);

  let buttonindex = themecustompresets.indexOf(theme);
  if(buttonindex == -1) buttonindex = themecustompresets.length + themes.indexOf(theme);
  let buttonelem = document.getElementById("themeselect").children[buttonindex];

  console.log(buttonindex);

  let current = document.getElementById("themeselectedbutton");
  if(current != null) current.id = "";
  buttonelem.id = "themeselectedbutton"



  let button = document.getElementById("themeselectbutton");
  button.innerHTML = theme.name;

  if(hidescreen){
    let container = document.getElementById("themecontainer");
    container.style.display = "none";
  }

}

function themeeditingname(event){
  themeediting.name = event.target.value;

  syncthemeedit();
}

function themeeditingfont(event){

  themeediting.font_family = event.target.value

  settheme(themeediting);
  syncthemeedit();

}

function deletethemeediting(){

  let themecustomizecontainer = document.getElementById("themecustomizecontainer");
  let themecustomize = document.getElementById("themecustomize");
  let themecustomizebuttext = document.getElementById("themecustomizebuttext");
  let themesettingsbutton = document.getElementById("themesettingsbutton");

  let themeselect = document.getElementById("themeselect")
  let index = themecustompresets.indexOf(themeediting);
  let preset = themeediting;
  let buttonelem = themeselect.children[index]

  themecustompresets.splice(index, 1);
  buttonelem.remove();

  let animTime = 300;

  $(themecustomizecontainer).animate({

    opacity: 0

  }, animTime, () => {

    if(currenttheme == themeediting){
      changetheme(themes[0], false);
    }

    settheme(currenttheme);
    themecustomizecontainer.style.display = "none";
    themecustomizecontainer.style.opacity = 1;

  })

}

function syncthemeedit(){


  let buttonelem2 = document.getElementById("themesettingsbutton");
  let themeselect = document.getElementById("themeselect")
  let index = themecustompresets.indexOf(themeediting);
  let preset = themeediting;
  let buttonelem = themeselect.children[index]

  buttonelem.children[0].innerHTML = preset.name;
  buttonelem.style.background = themeediting.background
  buttonelem.style.fontFamily = themeediting.font_family
  buttonelem.style.color = themeediting.text_color
  buttonelem.style.border = `solid 1px ${themeediting.button_border}`

  buttonelem.children[1].style.background = preset.button_background;
  buttonelem.children[1].style.border = `solid 1px ${preset.button_border}`

  buttonelem2.children[0].innerHTML = preset.name;
  buttonelem2.style.background = themeediting.background
  buttonelem2.style.fontFamily = themeediting.font_family
  buttonelem2.style.color = themeediting.text_color
  buttonelem2.style.border = `solid 1px ${themeediting.button_border}`

  buttonelem2.children[1].style.background = preset.button_background;
  buttonelem2.children[1].style.border = `solid 1px ${preset.button_border}`

}

function themeinit(){

    matchcurrenttheme();

    let keys = Object.keys(themes);

    let themeselect = document.getElementById("themeselect")

    let themesettingsbutton = document.getElementById("themesettingsbutton");

    let themesettingstext = document.createElement("p");

    themesettingstext.id = "themecustomizebuttext";

    themesettingsbutton.appendChild(themesettingstext);

    let backbutton = document.createElement("button");
    backbutton.classList.add("zulubutton");
    backbutton.classList.add("themeplus");

    let backimage = document.createElement("img");
    backimage.src = "settingsback.png";

    for(var i = 0; i < themecustompresets.length; i++){
      genpresetbutton(i);
    }

    backbutton.appendChild(backimage);

    themesettingsbutton.appendChild(backbutton);




    let colorselects = document.getElementsByClassName("themecolorraw");

    let length = colorselects.length;

    let added = [];

    for(var i = 0; i < length; i++){

      let element = colorselects[i];
      colorselects[i].style.opacity = "1"

      let placeholder = document.createElement("div");
      placeholder.style.background = colorselects[i].value;

      let key = element.parentElement.parentElement.children[0].innerHTML;

      key = key.toLowerCase().split(" ").join("_");


      colorselects[i].oninput = function() {

        placeholder.style.background = element.value;
        themeediting[key] = element.value;

        settheme(themeediting);
        syncthemeedit()



      }

      colorselects[i].parentElement.appendChild(placeholder);

      added.push(placeholder);

    }

    for(var i = 0; i < added.length; i++){
      added[i].classList.add("themecolor");
    }





    for(var i = 0; i < keys.length; i++){

      let num = i;

      let buttoncontainer = document.createElement("div");
      buttoncontainer.classList.add("themebuttoncontainer");

      let buttonelem = document.createElement("button");

      buttonelem.onclick =  (event) => {

        if(event.target.src != undefined || event.target.classList.contains("themeplus")) return;

        changetheme(themes[keys[num]], false)
      };


      buttonelem.classList.add("zulubutton");
      buttonelem.classList.add("themebutton");

      buttonelem.id = "themebutton" + keys[i];

      let background = themes[keys[i]].background

      buttonelem.style.background = background

      let border = themes[keys[i]].button_border;

      buttonelem.style.border = `solid 1px ` + border
      buttonelem.style.fontFamily = themes[keys[i]].font_family

      buttonelem.onmouseover = () => {
        //settheme(themes[keys[num]])
      }

      let buttontext = document.createElement("p");
      buttontext.innerHTML = themes[keys[i]].name;
      let text_color = themes[keys[i]].text_color;
      buttontext.style.color = text_color

      buttonelem.appendChild(buttontext)

      let clonebutton = document.createElement("button");
      clonebutton.classList.add("zulubutton");
      clonebutton.classList.add("themeplus");

      clonebutton.style.background = themes[keys[i]].button_background;
      clonebutton.style.border = `solid 1px ${themes[keys[i]].button_border}`


      let cloneimage = document.createElement("img");
      cloneimage.src = "plus.png";

      clonebutton.appendChild(cloneimage);

      clonebutton.onclick = () => {

        let newpreset = JSON.parse(JSON.stringify(themes[keys[num]]));
        newpreset.name = themes[keys[num]].name + " preset";
        themecustompresets.push(newpreset);

        let newelem = genpresetbutton(themecustompresets.length-1);


      }


      buttonelem.appendChild(clonebutton);

      themeselect.appendChild(buttonelem);

    }





}


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function setthemesettings(preset){

  let settings = document.getElementsByClassName("themesetting");

  for(var i = 0; i < settings.length; i++){

    let setting = (settings[i].children[0].innerHTML)

    if(setting == "Preset Name"){

      settings[i].children[1].value = preset.name;

    }
    else if(setting == "Font Family"){
      settings[i].children[1].value = preset.font_family;
    }
    else{
      let key = setting.toLowerCase().split(" ").join("_");

      let value = preset[key];

      if(value.includes("rgb")){

        var rgb = value.split( ',' ) ;
        let r = parseInt( rgb[0].substring(4) ) ; // skip rgb(
        let g = parseInt( rgb[1] ) ; // this is just g
        let b = parseInt( rgb[2] ) ; // parseInt scraps trailing )

        value = rgbToHex(r,g,b);

      }

      settings[i].children[1].children[0].value = value;
      settings[i].children[1].children[1].style.background = value;

    }



  }

}


function genpresetbutton(index){

  let themeselect = document.getElementById("themeselect")

  let buttoncontainer = document.createElement("div");
  buttoncontainer.classList.add("themebuttoncontainer");

  let buttonelem = document.createElement("button");
  let preset = themecustompresets[index];


  buttonelem.onclick =  (event) => {

    if(event.target.src != undefined || event.target.classList.contains("themeplus")) return;

    changetheme(preset, false);
  };



  buttonelem.classList.add("zulubutton");
  buttonelem.classList.add("themebutton");

  //buttonelem.id = "themebutton" + keys[i];

  let background = preset.background

  buttonelem.style.background = background

  let border = preset.button_border;

  buttonelem.style.border = `solid 1px ` + border
  buttonelem.style.fontFamily = preset.font_family

  buttonelem.onmouseover = () => {
    //settheme(preset)
  }

  let buttontext = document.createElement("p");
  buttontext.innerHTML = preset.name;
  let text_color = preset.text_color;
  buttonelem.style.color = text_color

  buttonelem.appendChild(buttontext)

  let changebutton = document.createElement("button");
  changebutton.classList.add("zulubutton");
  changebutton.classList.add("themeplus");

  changebutton.style.background = preset.button_background;
  changebutton.style.border = `solid 1px ${preset.button_border}`


  let changeimage = document.createElement("img");
  changeimage.src = "settings.png";

  changebutton.appendChild(changeimage);

  changebutton.onclick = () => {

    setthemesettings(preset);
    themeediting = preset;
    settheme(themeediting);

    let animTime = 300;

    let themecustomizecontainer = document.getElementById("themecustomizecontainer");
    let themecustomize = document.getElementById("themecustomize");
    let themecustomizebuttext = document.getElementById("themecustomizebuttext");

    themecustomizebuttext.innerHTML = preset.name;
    themecustomize.style.opacity = 0;
    themecustomizecontainer.style.display = "";

    let themesettingsbutton = document.getElementById("themesettingsbutton");

    console.log(preset.font_family);

    themesettingsbutton.style.background = preset.background
    themesettingsbutton.style.fontFamily = preset.font_family
    themesettingsbutton.style.color = preset.text_color
    themesettingsbutton.style.border = `solid 1px ${preset.button_border}`

    let offset = buttonelem.offsetTop - themeselect.scrollTop;

    console.log(offset);


    buttonelem.style.opacity = 0;
    themesettingsbutton.style.top = offset + "px";

    $(themecustomize).animate({

      opacity: 1

    }, animTime)

    $(themesettingsbutton).animate({

      top: (themecustomizecontainer.offsetHeight - buttonelem.offsetHeight - 9) + "px",

    }, animTime, "easeOutQuad")

    themesettingsbutton.onclick = () => {

      $(themecustomize).animate({

        opacity: 0

      }, animTime)

      $(themesettingsbutton).animate({

        top: offset + "px",

      }, animTime, "easeOutQuad", () => {

        settheme(currenttheme);

        buttonelem.style.opacity = "";

        themecustomizecontainer.style.display = "none";

      })



    }



  }

  buttonelem.appendChild(changebutton);

  themeselect.insertBefore(buttonelem, themeselect.childNodes[index+1]);

  return buttonelem;

}



function removethemefocus(event, me){

  console.log(event.target == me);

  if(event.target != me) return;

  let container = document.getElementById("themecontainer");

  container.style.display = "none";

  let themecustomizecontainer = document.getElementById("themecustomizecontainer");
  let themesettingsbutton = document.getElementById("themesettingsbutton");

  if(themecustomizecontainer.style.display == ""){
    themesettingsbutton.click()
  }

  document.body.classList.remove("noscroll");

  settheme(currenttheme);
  savethemelocal();

}

function settheme(obj){


  let keys = Object.keys(obj);

  for(var i = 0; i < keys.length; i++){

    let value = obj[keys[i]];
    r.style.setProperty(`--${keys[i]}`, value)

  }

  if(obj == currenttheme){

    document.getElementById("themeselectbutton").innerHTML = currenttheme.name;

  }


  makechart()

}
