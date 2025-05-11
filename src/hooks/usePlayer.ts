import { $ } from "../utils/dom";
import { ref } from "../utils/reactive-utils";

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



export const usePlayer = () => {

  const fileRef = ref<File | null>(null, (file) => {
    audioEl.src = URL.createObjectURL(file!);
  });

  const arrayBuffer = ref<ArrayBuffer>(new ArrayBuffer(0));
  const audioContext = ref<AudioContext | null>(null);
  const duration = ref<number>(0);
  const analyser = ref<AnalyserNode | null>(null);


  const audioBuffer = ref<AudioBuffer | null>(null, (val) => {
    console.log(val);
  });

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

          arrayBuffer.value = await file.arrayBuffer();
          const {track}  = await createAudioContext();

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
    audioContext.value = new AudioContext();
    audioBuffer.value = await audioContext.value.decodeAudioData(
      arrayBuffer.value
    );
    duration.value = audioBuffer.value.duration;
    

    const track = audioContext.value.createMediaElementSource(audioEl);
    analyser.value = audioContext.value.createAnalyser();

    return {
      track
    }
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
    audioBuffer,
    audioContext,
  };
};
