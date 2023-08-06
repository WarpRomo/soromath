
setInterval(settimer);

function settimer(){

  let elements = document.getElementsByClassName("timershow");

  for(var i = 0; i < elements.length; i++){

    if(window.getComputedStyle(elements[i]).display != "none"){






      const ctx = elements[i].getContext("2d");

      elements[i].width = 120;
      elements[i].height = 120;

      let starttime = ((!teststarted) ? (new Date().getTime()) : teststarted);
      let timeportion = ((new Date().getTime()) - starttime) / totaltime;

      ctx.beginPath();
      ctx.arc(60, 60, 50, 0, 2 * Math.PI);
      ctx.fillStyle = themes[currenttheme].background;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(60, 60, 50, 0, 2 * Math.PI * timeportion);

      ctx.lineTo(60, 60)
      ctx.moveTo(60, 60)
      ctx.lineTo(110, 60)

      ctx.fillStyle = themes[currenttheme].text_color;
      ctx.fill();

      ctx.beginPath()
      ctx.arc(60, 60, 50, 0, 2 * Math.PI);
      ctx.lineWidth = 5
      ctx.strokeStyle = themes[currenttheme].text_color;
      ctx.stroke();



    }



  }


}
