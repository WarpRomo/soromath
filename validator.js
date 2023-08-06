function validateanswer(e, validater, addproblem, getanswer, inputid, problemid, press=false){

    if(press && e.key != "Enter") return;
    if(press) console.log("YAA");

    let input = document.getElementById(inputid)
    let problems = document.getElementById(problemid);



    if(input.value.length == 0) return;

    let inputnumber = input.value;
    let mainproblemindex = 0;

    for(var i = 0; i < problems.children.length; i++){
      if(problems.children[i].id == "mainproblem"){
        mainproblemindex = i;
      }
    }

    let problem = problemlist[problemindex]
    let answer = getanswer(problem);

    let correct = validater(answer, inputnumber);


    if( !(correct || e.key == "Enter") ) return;
    input.value = "";

    if(problemindex == 0){
      starttest();
    }

    if(correct){
      problems.children[mainproblemindex].classList.add("rightanswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[0]++;
      console.log("GO", cpmtrack.length);
      problemcomplete(true)
    }
    else{
      problems.children[mainproblemindex].classList.add("wronganswer");
      problems.children[mainproblemindex].classList.add("completedproblem");
      stats[1]++;
      problemcomplete(false);
    }

    let fadeoutelem = problems.children[mainproblemindex];

    setTimeout(() => {
      $(fadeoutelem).animate({ opacity: '0' }, {duration: 400, easing:"linear"});
    }, 500)

    problems.children[mainproblemindex].id = "";
    problems.children[mainproblemindex+1].id = "mainproblem";


    let top = parseInt(window.getComputedStyle(problems).top);

    top -= 40

    $(problems).animate({ top: top + 'px' }, {duration: 0});


    problemindex++;

    addproblem();

}
