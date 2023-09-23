
function mouseClick(element){
	//element.addEventListener('click',setClick)
	element.onclick = setMouse
}

let mouse = {x:null,y:null}

function setMouse(event){
	mouse.x = event.clientX
	mouse.y = event.clientY
	console.log(mouse)
}

const getMousePosition=()=>mouse

function mouseMoving(element){
	element.addEventListener('mousemove',setMouse)
}

export {mouseClick,getMousePosition,mouseMoving}