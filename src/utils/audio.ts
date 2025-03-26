const getAudioDuration = (audioFileUrl: string) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioFileUrl);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration); // Duration in seconds
    });
    audio.addEventListener("error", (error) => {
      reject("Error loading audio file: " + error.message);
    });
  });
};
