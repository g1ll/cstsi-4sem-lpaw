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

const loadAudio = async(path)=>new Promise(resolve=>{
    const audio = new Audio(path)
    console.log('loading audio...')
    return audio.addEventListener("canplaythrough",()=>{
        console.log('Audio loaded: '+path)
        return resolve(audio)
    });
});

const loadVideo = async(path)=>new Promise(resolve=>{
    const video = document.createElement('video')
    console.log(video)
    video.src = path;
    console.log('loading video...')
    return video.addEventListener("canplaythrough",()=>{
        console.log('Video loaded: '+path)
        return resolve(video)
    });
});

export {loadImage,loadAudio, loadVideo}