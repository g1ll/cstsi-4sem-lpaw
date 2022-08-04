
let key;

function keyPress(element){
    element.addEventListener('keydown',event=>{
        key = event.key
        console.log(key)
    })
}

export { keyPress, key}