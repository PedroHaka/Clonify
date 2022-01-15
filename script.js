//Constants, Variables, Arrays, Lists
let music = document.querySelector('audio');
let trackName = document.querySelector('.description h2');
let artistName = document.querySelector('.description i');
let trackImg = document.querySelector('img');
let trackDuration = document.querySelector('.end');

let trackIndex = 0;

let trackList = [
    {
        title: 'Euphoria in D major',
        artist: 'Classical Dude',
        src: './audio/classical.wav',
        img: './img/classical-img.jpg'
    },
    {
        title: 'The Worthy Roads',
        artist: 'Country Club Outlaws',
        src: './audio/country.mp3',
        img: './img/country-img.jpg'
    },
    {
        title: 'Just vibing, nope',
        artist: 'TechFreak',
        src: './audio/edm.mp3',
        img: './img/edm-img.jpg'
    },
    {
        title: 'Pinpoint Sessions',
        artist: 'Da Hood',
        src: './audio/hiphop.mp3',
        img: './img/hiphop-img.jpg'
    },
    {
        title: 'Ephemeral Claim',
        artist: '80s most wanted',
        src: './audio/metal.wav',
        img: './img/metal-img.jpg'
    },
    {
        title: 'Good Vibes Jam',
        artist: 'Roots Run Deep',
        src: './audio/reggae.mp3',
        img: './img/reggae-img.jpg'
    },
    {
        title: 'Space Rock',
        artist: 'The Dellarians',
        src: './audio/rock.wav',
        img: './img/rock-img.jpg'
    }
]

//Events
document.querySelector('.button-play').addEventListener('click', playTrack);

document.querySelector('.button-pause').addEventListener('click', pauseTrack);

renderTrack(trackIndex);

music.addEventListener('timeupdate', updateDurationBar);

document.querySelector('.previous').addEventListener('click', () => { 
    trackIndex--;
    if(trackIndex < 0){
        trackIndex = 6;
        /* sete musicas começando no elemento 0, portanto 7=0, 8=1, ... */
    }
    renderTrack(trackIndex); 
    playTrack();
});

document.querySelector('.next').addEventListener('click', () => { 
    trackIndex++;
    if(trackIndex > 6){
        trackIndex = 0;
        /* sete musicas começando no elemento 0, portanto 7=0, 8=1, ... */
    }
    renderTrack(trackIndex); 
    playTrack();
});

//Functions
function playTrack() {
    music.play();/* toca musica */
    document.querySelector('.button-pause').classList.remove('invisible');
    document.querySelector('.button-play').classList.add('invisible');
    /* desaparece com o botão de play e substitui com botão de pause */

}
function pauseTrack() {
    music.pause();/* pausa música */
    document.querySelector('.button-pause').classList.add('invisible');
    document.querySelector('.button-play').classList.remove('invisible');
}
function updateDurationBar() {
    let bar = document.querySelector('progress');
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%';
    if (bar.style.width == '100%') {
        document.querySelector('.button-pause').classList.add('invisible');
        document.querySelector('.button-play').classList.remove('invisible');
    }

    let currTime = document.querySelector('.start');
    currTime.textContent = sectoMin(Math.floor(music.currentTime));

    trackDuration.textContent = sectoMin(Math.floor(music.duration - music.currentTime));

}
function sectoMin(seconds) {
    let minutesField = Math.floor(seconds / 60);
    if (minutesField < 10) {
        minutesField = '0' + minutesField;
    }
    let secondsField = seconds % 60;
    if (secondsField < 10) {
        secondsField = '0' + secondsField;
    }
    return minutesField + ':' + secondsField;
}
function renderTrack(index) {
    music.setAttribute('src', trackList[index].src);
    music.addEventListener('loadeddata', () => {
        trackName.textContent = trackList[index].title;
        artistName.textContent = trackList[index].artist;
        trackImg.src = trackList[index].img;
        trackDuration.textContent = sectoMin(Math.floor(music.duration));
    });
}