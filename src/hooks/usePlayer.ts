import { $ } from "../utils/dom";
import { ref } from "../utils/reactive-utils";

/**
 * Provides functions and variables for managing audio file input and display.
 * It initializes the file input element to load audio files when the user selects one.
 * It also creates an instance of the AudioContext class for audio processing and analysis.
 * The returned object provides a single method, `initApp`, which sets up necessary event listeners and configurations.
 * @returns {Object} An object with a single method, `initApp`.
 */
export const usePlayer = () => {
    

  const fileInput = $("#fileInput") as HTMLInputElement;
  const audioEl = $("#audio") as HTMLAudioElement;
  const peakList = $("#peaksList");
  const zoomSlider = $("#zoomSlider");
  const waveForm = $("#waveform") as HTMLCanvasElement;
  const scrollContainer = $("#scrollContainer");
  const autoplayToggle = $("#autoplayToggle");
  const spectogramm = $("#spectrogramm") as HTMLCanvasElement;
  const spectogrammSlider = $("#spectrogrammSlider");

  const waveFormCtx = waveForm?.getContext("2d") as CanvasRenderingContext2D;
  const spectogrammCtx = spectogramm?.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  const fileRef = ref<File | null>(null, (file) => {
    audioEl.src = URL.createObjectURL(file!);
  });

  /**
   * Initializes the file input element to load audio files when the user selects one.
   * This function sets up the change event listener on the file input element.
   * When the event is triggered, it loads the selected file into the audio element.
   */
  const initGetFileFromInput = () => {
    if (fileInput) {
      fileInput.addEventListener("change", function () {
        if (this.files?.length) {
          const file = this?.files[0];
          fileRef.value = file;
        }
      });
    }
  };

  /**
   * Creates an instance of the AudioContext class for audio processing
   * and analysis. This function returns nothing and is only used to
   * initialize the audio context.
   */
  const createAudioContext = () => {
    const audioCtx = new AudioContext();
  };

  /**
   * Initializes the application by setting up necessary event listeners and configurations.
   * Currently, it sets up the file input change event listener to load audio files.
   */

  const initApp = () => {
    initGetFileFromInput();
    createAudioContext();
  };

  return {
    initApp,
  };
};
