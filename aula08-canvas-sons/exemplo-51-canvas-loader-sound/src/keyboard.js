
let keys = [];
let key;

function keyPress(element){
    element.addEventListener('keydown',event=>{
        key = event.key
        console.log(key)
    })
}

function keyDown(element){
    window.addEventListener('keydown',addKey)
    window.addEventListener('keyup',removeKey)
}

function addKey(event){
    !hasKey(event.key) && keys.push(event.key)
    console.log(event)
}

function removeKey(event){
    console.log(keys)
    keys = keys.filter(key=>key!==event.key)
    console.log(keys)
}

const hasKey = (searchKey)=>keys.find(key=>searchKey===key)

export {keyDown, hasKey, keyPress, key}