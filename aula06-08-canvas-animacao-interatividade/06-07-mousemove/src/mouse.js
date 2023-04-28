
function mouseClick(element){
	element.onclick = setMouse
}

let mouse = {x:null,y:null}

function setMouse(event){
	mouse.x = event.clientX
	mouse.y = event.clientY
}

const getMouse=()=>mouse

function mouseMove(element){
	element.addEventListener('mousemove',setMouse)
}

export {mouseClick,getMouse,mouseMove}