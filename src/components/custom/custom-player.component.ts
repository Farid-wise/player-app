import { defineCustomTag } from "../../utils/custom-elems";
import { Text } from "../common/Text";
import { Spectogram } from "../ui/Spectogram";
import { WaveForm } from "../ui/WaveForm";

interface PlayerComponentProps {
  title: string;
  tag?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "label"
    | "div";
}

/**
 * Defines a custom HTML element `<custom-player>` that displays a music player.
 * The element takes an optional `title` property to set the title of the player,
 * and an optional `tag` property to specify the HTML tag to use (defaults to
 * `span`).
 *
 * The component renders an audio element with controls, a label to toggle autoplay,
 * a waveform, a spectrogram, and a list of top peaks.
 *
 * @example
 * <custom-player title="Music Player"></custom-player>
 */
export function PlayerComponent() {
    
  return defineCustomTag<PlayerComponentProps>(
    "custom-player",
    ({ title = "", tag = "span" }) => `
      
      
      
        ${Text({
          title,
          tag,
        })}
        <input type="file" id="fileInput" accept=".mp3, .wav" />
        <div class="row audio-holder">
            <audio id="audio" controls></audio>
            <label class="input-holder">Autoplay<input type="checkbox" id="autoplayToggle" checked /></label>

            ${Spectogram()}

        </div>



        <div id="scrollContainer" style="overflow-x: auto; width: 100%; border: 1px solid #ccc;">
            ${WaveForm()}
        </div>
        <div class="row">
            <label class="input-holder">Zoom: <input type="range" id="zoomSlider" min="1" max="4" value="1" /></label>
            <label class="input-holder">Spectrogramm columns: <input type="range" id="spectrogrammSlider" min="5" max="10" value="7" step="1" /></label>
        </div>
        <h2>Top peaks (10%):</h2>
        <div id="peaksList"></div>
      
      
      `
  );
}
