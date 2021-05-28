const video = document.querySelector('.viewer');
const toggleButton = document.querySelector('.toggle');
const progressBar = document.querySelector('.progress');
const progressFilled = progressBar.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('.player__button');
const volume = document.querySelector('[name="volume"]');
const playbackSpeed = document.querySelector('[name="playbackRate"]');
let timeSkipButtons = [];
skipButtons.forEach(button => {
    if(button === toggleButton) return;
    timeSkipButtons.push(button);
});
toggleButton.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);
video.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', updateProgressOnClick);
timeSkipButtons.forEach(button => button.addEventListener('click', changeVideoTime));
volume.addEventListener('input', updateVolume);
playbackSpeed.addEventListener('input', updateSpeed);


function toggleVideo() {
    if(video.paused) {
        video.play();
        toggleButton.innerHTML = "❚ ❚";
    }
    else {
        video.pause();
        toggleButton.innerHTML = "►";
    }
}

function updateProgressBar() {
    const duration = video.duration;
    const currentTime = video.currentTime;
    const percentDone = (currentTime / duration) * 100;
    progressFilled.style.flexBasis = `${percentDone}%`;
}

function updateProgressOnClick(e) {
    const mouseX = e.offsetX;
    const percent = mouseX / progressBar.clientWidth;
    video.currentTime = percent * video.duration;
}

function changeVideoTime() {
    const skipVal = this.dataset.skip;
    video.currentTime += parseFloat(skipVal);
}

function updateVolume() {
    video.volume = volume.value;
}

function updateSpeed() {
    video.playbackRate = playbackSpeed.value;
}
