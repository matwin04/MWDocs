document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('td video');
    let loopCount = 0;

    videos.forEach(video => {
        video.autoplay = true;
        video.loop = false;
        video.volume = 0.1;
        video.playbackRate = 1.0;

        video.addEventListener('ended', () => {
            video.volume = Math.min(video.volume + 0.002324, 1.0);
            video.playbackRate += 0.002324;
            video.currentTime = 0;
            video.play();

            loopCount++;
            document.getElementById('loop-count').textContent = loopCount;
        });
    });
});