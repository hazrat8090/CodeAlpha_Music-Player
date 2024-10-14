const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const currentTimeElem = document.getElementById("current-time");
const totalDurationElem = document.getElementById("total-duration");
const volumeBar = document.getElementById("volume-bar");

let isPlaying = false;

// Toggle Play/Pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "⏯️"; // Play icon
  } else {
    audio.play();
    playBtn.textContent = "⏸️"; // Pause icon
  }
  isPlaying = !isPlaying;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progressBar.value = (currentTime / duration) * 100;

  // Update current time
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  currentTimeElem.textContent = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  // Update total duration
  if (duration) {
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    totalDurationElem.textContent = `${totalMinutes}:${
      totalSeconds < 10 ? "0" + totalSeconds : totalSeconds
    }`;
  }
});

// Progress bar control
progressBar.addEventListener("input", (e) => {
  const newTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Volume control
volumeBar.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});
