const playerContainer = document.querySelector('[data-blogcast-player]')
const playerFallback = document.querySelector('[data-blogcast-error]')
const playBtn = document.getElementById('playAudioBtn')
const pauseBtn = document.getElementById('pauseAudioBtn')
const blogcastPlayer = document.getElementById('blogcastPlayer')

if (playerContainer && playerFallback && blogcastPlayer) {
    blogcastPlayer.addEventListener('loadeddata', () => {
        playerFallback.style.display = 'none'
        playerContainer.style.display = null
    })
}

if (playBtn && pauseBtn && blogcastPlayer) {
    playBtn.addEventListener('click', () => {
        blogcastPlayer.play()
        playBtn.style.display = 'none'
        pauseBtn.style.display = null
    })
    pauseBtn.addEventListener('click', () => {
        blogcastPlayer.pause()
        playBtn.style.display = null
        pauseBtn.style.display = 'none'
    })
    
    blogcastPlayer.addEventListener('ended', () => {
        blogcastPlayer.currentTime = 0;
        playBtn.style.display = null
        pauseBtn.style.display = 'none'
    })
}