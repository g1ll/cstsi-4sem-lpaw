
let keys = [];
let key;

function keyPress(element){
    element.addEventListener('keydown',event=>{
        key = event.key
    })
}

function keyDown(element){
    element.addEventListener('keydown',handleKeyPress)
}

function handleKeyPress(event){
    !hasKey(event.key) && keys.push(event.key)
    
    element.addEventListener('keyup',removeKey)
}

function removeKey(event){
    console.log(keys)
    keys = keys.filter(key=>key!==event.key)
    // console.log(keys)
}

const hasKey = (searchKey)=>keys.find(key=>searchKey===key)

export {keyDown, hasKey, keyPress, key}