
let key = '';

function keyPress(element){
    element.addEventListener('keydown',evento=>{
        key = evento.key
        console.log(key)
    })
}

export { keyPress, key}