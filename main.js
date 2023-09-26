// functionality for showing/hiding the transcript
const showHideTranscriptBtn = document.querySelector(".show-hide-transcript");
const transcript = document.querySelector(".transcript");

showHideTranscriptBtn.textContent = "Show transcript";
transcript.style.display = "none";

showHideTranscriptBtn.onclick = function () {
  if (showHideTranscriptBtn.textContent === "Show transcript") {
    showHideTranscriptBtn.textContent = "Hide transcript";
    transcript.style.display = "block";
  } else {
    showHideTranscriptBtn.textContent = "Show transcript";
    transcript.style.display = "none";
  }
};

// functionality for showing/hiding the comments section

const showHideCommentsBtn = document.querySelector(".show-hide-comments");
const commentWrapper = document.querySelector(".comment-wrapper");

commentWrapper.style.display = "none";

showHideCommentsBtn.onclick = function () {
  let showHideText = showHideCommentsBtn.textContent;
  if (showHideText === "Show comments") {
    showHideCommentsBtn.textContent = "Hide comments";
    commentWrapper.style.display = "block";
  } else {
    showHideCommentsBtn.textContent = "Show comments";
    commentWrapper.style.display = "none";
  }
};

// functionality for adding a new comment via the comments form

const form = document.querySelector(".comment-form");
const nameField = document.querySelector("#name");
const commentField = document.querySelector("#comment");
const list = document.querySelector(".comment-container");

form.onsubmit = function (e) {
  e.preventDefault();
  submitComment();
};

function submitComment() {
  const listItem = document.createElement("li");
  const namePara = document.createElement("p");
  const commentPara = document.createElement("p");
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = "";
  commentField.value = "";
}

/* Audio controls */
const audio = document.querySelector("audio");
audio.removeAttribute("controls");

function elt(type, attrs, ...children) {
  const element = document.createElement(type);
  if (attrs) Object.assign(element, attrs);

  for (const child of children) {
    element.append(child);
  }

  return element;
}

/* Elements creation */
const playPauseBtn = elt("button", { className: "show-hide" }, "Play");
const fwdBtn = elt("button", { className: "show-hide" }, "Fwd");
const rwdBtn = elt("button", { className: "show-hide" }, "Rwd");
const timeDisplay = elt("div", { className: "time-display" }, "00:00");
const progressBar = elt(
  "progress",
  null,
  "Your browser does not support progress bar"
);
progressBar.setAttribute("value", 0);
progressBar.setAttribute("aria-label", "Audio progress bar");
audio.onloadedmetadata = () => {
  progressBar.setAttribute("max", audio.duration);
}
progressBar.setAttribute("aria-busy", "true");
const muteBtn = elt("button", { className: "show-hide" }, "Mute");

/* appending */
const audioWrapper = audio.parentElement;
const controlsWrapper = elt(
  "div",
  null,
  elt("div", null, progressBar),
  elt("div", { className: "controls" },
    playPauseBtn,
    fwdBtn,
    rwdBtn,
    muteBtn,
    timeDisplay,
  )
);

audioWrapper.appendChild(controlsWrapper);

/* registering event handlers */
playPauseBtn.onclick = function () {
  if (audio.paused) {
    playPauseBtn.textContent = "Pause";
    audio.play();
  } else {
    playPauseBtn.textContent = "Play";
    audio.pause();
  }
}

audio.ontimeupdate = () => {
  const minutes = Math.round(audio.currentTime / 60);
  const minutesString = minutes < 10 ? "0" + minutes : minutes;
  const seconds = Math.round(audio.currentTime % 60);
  const secondsString = seconds < 10 ? "0" + seconds : seconds;

  timeDisplay.textContent = minutesString + ":" + secondsString;

  progressBar.setAttribute("value", audio.currentTime.toFixed(1));

  if (audio.currentTime >= audio.duration) {
    playPauseBtn.textContent = "Replay";
  }
}

fwdBtn.onclick = () => {
  audio.currentTime += 2;
  
  if (audio.currentTime >= audio.duration) {    
    playPauseBtn.textContent = "Replay";
  }
}

rwdBtn.onclick = () => {
  audio.currentTime -= 2;
  if (playPauseBtn.textContent === 'Replay') {
    playPauseBtn.textContent = "Play";
  }
}

muteBtn.onclick = () => {
  if (audio.muted) {
    muteBtn.textContent = "Mute";
    audio.muted = false;
  } else {
    muteBtn.textContent = "Unmute";
    audio.muted = true;
  }
}