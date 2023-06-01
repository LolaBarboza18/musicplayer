document.addEventListener('DOMContentLoaded', function() {
const songList = document.querySelectorAll('.song-list li');
const playBtn = document.querySelector('.play-btn');
const pauseBtn = document.querySelector('.pause-btn');
const skipBtn = document.querySelector('.skip-btn');
const downloadBtn = document.querySelector('.download-btn');
const volumeBtn = document.querySelector('.volume-btn');
const scrollingText = document.querySelector('.scrolling-text');

let currentSong = null;
let currentVolume = 0;
const volumeLevels = [0, 0.25, 0.5, 0.75, 1];
const volumeIcons = ['fa-volume-mute', 'fa-volume-down', 'fa-volume-up', 'fa-volume-up', 'fa-volume-up'];
const songs = [
    { name: 'Song A', src: 'songA.mp3' },
    { name: 'Song B', src: 'songB.mp3' },]

// Event listeners
playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
skipBtn.addEventListener('click', skipSong);
downloadBtn.addEventListener('click', downloadSong);
volumeBtn.addEventListener('click', changeVolume);

// Play the selected song
function playSong() {
  if (currentSong) {
    currentSong.pause();
  }
  const songSrc = this.parentElement.previousElementSibling.querySelector('li.active').getAttribute('data-src');
  currentSong = new Audio(songSrc);
  currentSong.volume = currentVolume;
  currentSong.play();
}

// Pause the current song
function pauseSong() {
  if (currentSong) {
    currentSong.pause();
  }
}

// Skip to the next song
function skipSong() {
  if (currentSong) {
    currentSong.pause();
  }
  const activeSong = this.parentElement.previousElementSibling.querySelector('li.active');
  const nextSong = activeSong.nextElementSibling || activeSong.parentElement.firstElementChild;
  activeSong.classList.remove('active');
  nextSong.classList.add('active');
  playSong.call(playBtn);
}

// Download the current song
function downloadSong() {
  const songSrc = this.parentElement.previousElementSibling.querySelector('li.active').getAttribute('data-src');
  window.location.href = songSrc;
}

// Change the volume in a pattern
function changeVolume() {
  currentVolume = volumeLevels[(volumeLevels.indexOf(currentVolume) + 1) % volumeLevels.length];
  currentSong.volume = currentVolume;
  updateVolumeIcon();
}

// Update the volume icon based on the current volume level
function updateVolumeIcon() {
  const icon = volumeBtn.querySelector('i');
  icon.className = '';
  const volumeLevel = Math.round(currentVolume * 100);
  if (volumeLevel === 0) {
    icon.classList.add('fas', 'fa-volume-mute');
  } else if (volumeLevel === 100) {
    icon.classList.add('fas', 'fa-volume-up');
  } else {
    icon.classList.add('fas', 'fa-volume-down');
  }
}

// Initialize the music player
function initMusicPlayer() {
  songList.forEach((song, index) => {
    song.addEventListener('click', function() {
      songList.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      playSong.call(playBtn);
    });
  });

  setInterval(() => {
    scrollingText.scrollLeft += 1;
  }, 30);
}

initMusicPlayer();

});
