import { Text } from "./common/Text";
import { Spectogram } from "./ui/Spectogram";
import { WaveForm } from "./ui/WaveForm";



/**
 * Renders the entire app.
 * The app is a user interface for playing audio files, displaying a waveform of the audio
 * and a spectrogram of the audio.
 * @returns {string} The HTML of the app.
 */
export const App = () => {
    return `
        
    
        ${Text({
            title: 'Choose MP3/WAV file',
            tag: 'h1'
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
        <user-card name="Fari2d"></user-card>


        
        
        
    `;
};
