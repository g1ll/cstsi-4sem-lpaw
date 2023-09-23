
let key = '';

function keyPress(element){
    element.addEventListener('keypress',evento=>{
        key = evento.key
        console.log(key)
    })
}

export { keyPress, key}