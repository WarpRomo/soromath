
setInterval(settimer);

function settimer(){

  let elements = document.getElementsByClassName("timershow");

  for(var i = 0; i < elements.length; i++){

    if(!teststarted){
      elements[i].style.opacity = 0.1;
    }
    else{
      elements[i].style.opacity = "";
    }

    if(window.getComputedStyle(elements[i]).display != "none"){






      const ctx = elements[i].getContext("2d");

      elements[i].width = 120;
      elements[i].height = 120;

      let starttime = ((!teststarted) ? (new Date().getTime()) : teststarted);
      let timeportion = ((new Date().getTime()) - starttime) / totaltime;

      ctx.beginPath();
      ctx.arc(60, 60, 50, 0, 2 * Math.PI);

      let background = getComputedStyle(document.body).getPropertyValue('--background');

      ctx.fillStyle = background;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(60, 60, 50, 0, 2 * Math.PI * timeportion);

      ctx.lineTo(60, 60)
      ctx.moveTo(60, 60)
      ctx.lineTo(110, 60)

      ctx.globalAlpha = 0.5

      let text_color = getComputedStyle(document.body).getPropertyValue('--text_color');

      ctx.fillStyle = text_color;
      ctx.fill();

      ctx.beginPath()
      ctx.arc(60, 60, 50, 0, 2 * Math.PI);
      ctx.lineWidth = 5
      ctx.strokeStyle = text_color;
      ctx.stroke();

      ctx.globalAlpha = 1



    }



  }


}
