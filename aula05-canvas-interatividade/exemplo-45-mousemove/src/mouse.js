
function mouseClick(element){
	element.onclick = setClick
}

let click = {x:null,y:null}

function setClick(event){
	click.x = event.clientX
	click.y = event.clientY
}

const getClick=()=>click

function mouseMove(element){
	element.addEventListener('mousemove',setClick)
}

export {mouseClick,getClick,mouseMove}