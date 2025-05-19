import { usePlayerStore } from "../store/player.store";
import { useContext } from "./useContext";

export const usePlayer = () => {
  const { fileRef, storeData } = usePlayerStore(insertAudio);
  const {
    audioEl,
    fileInput,
    peakList,
    zoomSlider,
    waveForm,
    scrollContainer,
    autoplayToggle,
    spectogramm,
    spectogrammSlider,
  } = useContext();

  function insertAudio(file: File | null) {
    audioEl.src = URL.createObjectURL(file!);
  }

  /**
   * Initializes the file input element to load audio files when the user selects one.
   * This function sets up the change event listener on the file input element.
   * When the event is triggered, it loads the selected file into the audio element.
   */
  const initGetFileFromInput = () => {
    if (fileInput) {
      fileInput.addEventListener("change", async function () {
        if (this.files?.length) {
          const file = this?.files[0];
          fileRef.value = file;

          storeData.value.arrayBuffer = await file.arrayBuffer();
          const { track } = await createAudioContext();

          console.log(track);
        }
      });
    }
  };

  /**
   * Creates an instance of the AudioContext class for audio processing
   * and analysis. This function returns nothing and is only used to
   * initialize the audio context.
   */
  const createAudioContext = async () => {
    storeData.value.audioContext = new AudioContext();
    storeData.value.audioBuffer =
      await storeData.value.audioContext?.decodeAudioData(
        storeData.value.arrayBuffer
      );
    storeData.value.duration = storeData.value.audioBuffer.duration;

    const track =
      storeData.value.audioContext.createMediaElementSource(audioEl);
    storeData.value.analyser = storeData.value.audioContext.createAnalyser();
    storeData.value.fftSize = parseInt(spectogrammSlider?.value!, 10);
    storeData.value.analyser.fftSize = storeData.value.fftSize;
    storeData.value.dataArray = new Uint8Array(storeData.value.analyser.frequencyBinCount);

    track.connect(storeData.value.analyser);
    storeData.value.analyser.connect(storeData.value.audioContext.destination);

    return {
      track,
    };
  };

  /**
   * Initializes the application by setting up necessary event listeners and configurations.
   * Currently, it sets up the file input change event listener to load audio files.
   */

  const initApp = () => {
    initGetFileFromInput();


  };


  return {
    initApp,
    fileRef,
    storeData
  };
};
