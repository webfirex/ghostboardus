export const playAudio = (filePath: string) => {
    const audio = new Audio(filePath);

    audio.play().catch((error) => {
        console.error('Error playing audio:', error);
    });
};