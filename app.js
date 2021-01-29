const app=()=>{
    const song=document.getElementById("song");
    const play=document.querySelector(".play");
    const outline=document.querySelector(".moving-outline circle");
    const video=document.querySelector(".vid-container video");
    const sounds=document.querySelectorAll('.sound-picker button');
    const timedisplay=document.querySelector(".time-display");
    const outlinelength=outline.getTotalLength();
    const timeselect=document.querySelectorAll('.time-select button');
    let fakeduration=600;

    outline.style.strokeDasharray=outlinelength;
    outline.style.strokeDashoffset=outlinelength;
    

    sounds.forEach(sound=>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            console.log(song.src);
            checkplaying(song);
        });
    });


    play.addEventListener('click',()=>{
        checkplaying(song);
    });
   
    
    timeselect.forEach(options=>{
        options.addEventListener('click',function(){
            fakeduration=this.getAttribute("data-time");
            timedisplay.textContent=`${Math.floor(fakeduration/60)}:${Math.floor(fakeduration%60)}`;
        });
    });
    const checkplaying=song=>{

        console.log(song);
        if(song.paused)
        {
            song.play();
            video.play();
            play.src="./svg/pause.svg";
        }

    
        
        else{
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    };
    song.ontimeupdate=()=>{
        var currentTime=song.currentTime;
        console.log(currentTime);
        let elapsed=fakeduration-currentTime;
        let seconds=Math.floor(elapsed%60);
        let minutes=Math.floor(elapsed/60);
        let progress=outlinelength-(currentTime/fakeduration)*outlinelength;
        outline.style.strokeDashoffset=progress;
        timedisplay.textContent=`${minutes}:${seconds}`
        
       
       if(currentTime>fakeduration)
        {
            song.paused();
            song.currentTime=0;
            play.src='./svg/play.svg';
            video.paused();
        }
    };


};

app();

