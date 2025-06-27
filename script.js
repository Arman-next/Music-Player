const image = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const music = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationTime = document.querySelector("#duration");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

// set a boolean value for play/pause
let isPlaying = false;

// music array
const musicList = [
  {
    name: "Zaroori Tha",
    displayName: "Zaroori Tha",
    artist: "Rahat Fateh Ali Khan",
  },
  {
    name: "O Mahi O Mahi",
    displayName: "O Mahi O Mahi",
    artist: "Arijit Singh",
  },
  {
    name: "Aabaad Barbaad",
    displayName: "Aabaad Barbaad",
    artist: "Arijit Singh",
  },
  {
    name: "Aasa Kooda",
    displayName: "Aasa Kooda",
    artist: "Sai Abhyankkar/Sai Smriti",
  },
];

// play the music
function mediaPlay() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// pause the music
function mediaPause() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// event on the play button
playBtn.addEventListener("click", () => {
  isPlaying ? mediaPause() : mediaPlay();
});

// update DOM wrt songs
function loadSongs(musicList) {
  title.textContent = musicList.displayName;
  artist.textContent = musicList.artist;
  music.src = `./music/${musicList.name}.mp3`;
  image.src = `./img/${musicList.name}.avif`;
}

// set variable for track the indexing of songs
let songIndex = 0;

// previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = musicList.length - 1;
  }
  loadSongs(musicList[songIndex]);
  mediaPlay();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > musicList.length - 1) {
    songIndex = 0;
  }
  loadSongs(musicList[songIndex]);
  mediaPlay();
}

// update the progress line of song
function updateProgressBar(e) {
  if (isPlaying) {
    // changing the progress line
    const { duration, currentTime } = e.srcElement;
    const progressBar = (currentTime / duration) * 100;
    progress.style.width = `${progressBar}%`;

    // calculate the minutes for toatal duration
    const durationMinutes = Math.floor(duration / 60);

    // calculate the secondes for total duration
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // set the delay for next song duration calculation for NaN error
    if (durationSeconds) {
      durationTime.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // calculate the minutes for current time
    const currentMinutes = Math.floor(currentTime / 60);

    // calculate the secondes for total duration
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// selection of the progesss bar and play form the click area
function selectTheTime(e) {
  // get the width of progress bar
  const width = this.clientWidth;

  //   get the click position
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// add event listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", selectTheTime);

loadSongs(musicList[0]);
