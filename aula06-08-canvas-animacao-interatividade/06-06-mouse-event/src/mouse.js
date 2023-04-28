
function mouseClick(element){
//element.addEventListener('click',setClick)
	element.onclick = setClick
}

let click = {x:null,y:null}

function setClick(event){
	click.x = event.clientX
	click.y = event.clientY
	console.log(click)
}

const getClick=()=>click

function mouseMoving(element){
	element.addEventListener('mousemove',setClick)
}

export {mouseClick,getClick,mouseMoving}