
function mouseClick(element){
	console.log('click')
	element.onclick = setClick
	// element.addEventListener('click',setClick)
}

let click = {x:null,y:null}
let hover = {x:null,y:null}
function setClick(event){
	click.x = event.clientX
	click.y = event.clientY
}

function setHover(event){
	console.log('hover')
	hover.x = event.clientX
	hover.y = event.clientY
	// click = {x:null,y:null}
}

const getClick=()=>click
const getHover=()=>hover

function mouseMove(element){
	element.addEventListener('mousemove',setHover)
}

export {mouseClick,getClick,mouseMove,getHover}