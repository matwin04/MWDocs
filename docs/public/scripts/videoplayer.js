var video = document.getElementById("video1");
function playPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}