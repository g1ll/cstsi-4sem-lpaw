const loadImage = async (url,progress) => 
    new Promise(resolve=>{
    const img = new Image();
    img.addEventListener("load",
     () => {
        progress.count++
        console.log('loaded: '+url);
        return resolve(img);
    });
    img.src = url;
    console.log('loading img: '+url)
});

const loadAudio = async(path,progress)=>new Promise(resolve=>{
    const audio = new Audio(path)
    console.log('loading audio...')
    return audio.addEventListener("canplaythrough",()=>{
        console.log('Audio loaded: '+path)
        progress.count++
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