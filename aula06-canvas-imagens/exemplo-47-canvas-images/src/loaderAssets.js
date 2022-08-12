const loadImage = async (url) => new Promise(resolve=>{
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.src = url;
    console.log('load img: '+url)
});

export {loadImage}