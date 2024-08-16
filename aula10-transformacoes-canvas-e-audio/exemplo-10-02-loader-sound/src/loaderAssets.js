const loadImage = async (url) => 
    new Promise(resolve=>{
        const img = new Image();
        img.addEventListener("load",()=> {
                console.log('loaded: '+url);
                return resolve(img);
            });
        img.src = url;
        console.log('loading img: '+url)
});

const loadAudio = async(path)=> 
    new Promise((resolve,reject)=>{
        let timeout = 3
        const audio = new Audio(path)
        console.log('loading audio...')
        let listener = ()=>{
            console.log('Audio loaded: '+path)
            return resolve(audio)
        }
        audio.addEventListener("canplaythrough",listener);

        setTimeout(() => {
            console.log('remover o evento')
            // audio.removeEventListener("canplaythrough",listener)
            return reject(`Audio demorado, load acima de ${timeout} milisegundos!!!`)
        }, timeout);
    });

export {loadImage,loadAudio}