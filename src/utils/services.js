const playOrderNotificationAudio = () => {
    const audio = new Audio('/order-notification-sound.mp3')
    audio.play()
}

const playBellAudio = () => {
    const audio = new Audio('/bell sound.mp3')
    audio.play()
}


export {
    playOrderNotificationAudio,
    playBellAudio
}