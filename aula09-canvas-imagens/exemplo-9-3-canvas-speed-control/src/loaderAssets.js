const loadImage = async (url) => 
    new Promise(resolve=>{
    const img = new Image();
    img.addEventListener("load",
     () => {
        console.log('loaded: '+url);
        return resolve(img);
    });
    img.src = url;
    console.log('loading img: '+url)
});

export {loadImage}