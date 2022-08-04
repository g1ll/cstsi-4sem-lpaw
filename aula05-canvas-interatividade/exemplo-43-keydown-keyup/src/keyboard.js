
let keys = [];

function keyDownUp(element){
    window.addEventListener('keydown',addKey)
    window.addEventListener('keyup',removeKey)
}

const hasKey = (searchKey)=>keys.find(key=>searchKey===key)

function addKey(event){
    !hasKey(event.key) && keys.push(event.key)
    console.log(keys)
}

function removeKey(event){
    keys = keys.filter(key=>key!==event.key)
    console.log(keys)
}

const getKeys = ()=>keys



export {keyDownUp, hasKey, getKeys}