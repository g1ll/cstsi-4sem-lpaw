const loadImage = (url)=>new Promise((resolve,reject)=>{
    const img = new Image();
    img.addEventListener("load",() => {
        console.log('loaded: '+url);
        return resolve(img);
    });
    img.src = url;
    console.log('waiting img: '+url)
    if(false)reject("retorna algo: msg erro")
});

export {loadImage}