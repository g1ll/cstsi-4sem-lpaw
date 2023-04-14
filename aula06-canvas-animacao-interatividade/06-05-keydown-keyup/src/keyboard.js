
let keys = [];

function keyDownUp(element){
    element.addEventListener('keydown',addKey)
    element.addEventListener('keyup',removeKey)
}

const hasKey = (searchKey)=>keys.find(key=>searchKey===key)
//Argel: https://www.brunobrito.net.br/configurar-firacode-vscode/

function addKey(event){
    !hasKey(event.key) && keys.push(event.key)
    // if(hasKey(event.key)==false)
    //     keys.push(event.key)

    console.log(keys)
}

function removeKey(event){ 
    keys = keys.filter(key=>key!=event.key)
    console.log(keys)
}

const getKeys = ()=>keys



export {keyDownUp, hasKey, getKeys}