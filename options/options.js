let difficultybuttons = ["easybutton", "mediumbutton", "hardbutton"];
let difficultynames = ["easy", "medium", "hard"];

function setdifficulty(difficulty){

  let current = document.getElementById(difficultybuttons[currentdifficulty]);
  let pressed = document.getElementById(difficultybuttons[difficulty]);

  current.classList.remove("textselected");
  pressed.classList.add("textselected");

  currentdifficulty = difficulty

  init();

}

function settime(elem, time){

  totaltime = time;

  let current = document.getElementById("timeselected");
  current.id = "";
  current.classList.remove("textselected");

  elem.id = "timeselected";
  elem.classList.add("textselected");

  init();

}
