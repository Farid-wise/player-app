import { extractShadow } from "../utils/dom";

/**
 * Retrieves all the elements and contexts needed for the player component.
 * @returns {object} An object containing the retrieved elements and contexts.
 */
export function useContext() {
    
  const customPlayer = extractShadow("custom-player");

  const audioEl = customPlayer?.querySelector("#audio") as HTMLAudioElement;
  const fileInput = customPlayer?.querySelector(
    "#fileInput"
  ) as HTMLInputElement;
  const peakList = customPlayer?.querySelector("#peakList") as HTMLUListElement;
  const zoomSlider = customPlayer?.querySelector(
    "#zoomSlider"
  ) as HTMLInputElement;
  const waveForm = customPlayer?.querySelector(
    "#waveform"
  ) as HTMLCanvasElement;
  const scrollContainer = customPlayer?.querySelector(
    "#scrollContainer"
  ) as HTMLDivElement;
  const autoplayToggle = customPlayer?.querySelector(
    "#autoplayToggle"
  ) as HTMLInputElement;
  const spectogramm = customPlayer?.querySelector(
    "#spectogramm"
  ) as HTMLCanvasElement;
  const spectogrammSlider = customPlayer?.querySelector(
    "#spectrogrammSlider"
  ) as HTMLInputElement;

  const waveFormCtx = waveForm?.getContext("2d") as CanvasRenderingContext2D;
  const spectogrammCtx = spectogramm?.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  return {
    audioEl,
    fileInput,
    peakList,
    zoomSlider,
    waveForm,
    scrollContainer,
    autoplayToggle,
    spectogramm,
    spectogrammSlider,
    waveFormCtx,
    spectogrammCtx,
  }
}
