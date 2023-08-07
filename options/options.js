let difficultybuttons = ["easybutton", "mediumbutton", "hardbutton"];
let difficultynames = ["easy", "medium", "hard"];

function setdifficulty(difficulty){

  let current = document.getElementById(difficultybuttons[currentdifficulty]);
  let pressed = document.getElementById(difficultybuttons[difficulty]);

  current.classList.remove("difficultyselected");
  pressed.classList.add("difficultyselected");

  currentdifficulty = difficulty

  init();

}

function settime(elem, time){

  totaltime = time;

  let current = document.getElementById("timeselected");
  current.id = "";
  elem.id = "timeselected";

  init();

}
