var e,l=print=(e,l)=>{console.log(e);e.font="bold 42px _sans",e.textBaseline="top";let o=e.measureText(l);console.log(o),e.fillStyle="#000",e.fillText(l,e.canvas.width/2-o.width/2,e.canvas.height/2-42)},o=startCanvas=()=>{const e=document.querySelector("canvas");console.log(e),l(e.getContext("2d"),"Olá Blunder!!!")};e="Olá RollUp!",console.log(e),window.addEventListener("load",o,!1);