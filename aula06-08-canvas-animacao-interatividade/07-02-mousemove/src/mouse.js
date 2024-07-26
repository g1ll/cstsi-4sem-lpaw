let hover = {x:null,y:null}
let click = {x:null,y:null}

function mouseMove(element){
	element.addEventListener('mousemove',setHover)
}

function mouseClick(element){
	console.log('click')
	element.onclick = setClick
	// element.addEventListener('click',setClick)
}

const setClick=(event)=>{
	click.x = event.clientX
	click.y = event.clientY
}

const setHover=(event)=>{
	console.log('hover')
	hover.x = event.clientX
	hover.y = event.clientY
	// click = {x:null,y:null}
}

const getClick=()=>click
const getHover=()=>hover

export {mouseClick,getClick,mouseMove,getHover}