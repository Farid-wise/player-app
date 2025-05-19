import {ref } from "../utils/reactive-utils";

/**
 * Creates a reactive store for the player component that contains properties for
 * - fileRef: the currently selected file
 * - arrayBuffer: the raw audio data
 * - audioContext: the AudioContext
 * - duration: the duration of the audio (in seconds)
 * - analyser: the AnalyserNode
 * - audioBuffer: the AudioBuffer
 *
 * @param {function} fileRefCallback - A callback function that is called when the fileRef property changes.
 * @returns {Object} A reactive store containing the specified properties.
 */


interface StoreData {
  arrayBuffer: ArrayBuffer;
  audioContext: AudioContext | null;
  duration: number;
  analyser: AnalyserNode | null;
  audioBuffer: AudioBuffer | null;
  dataArray: Uint8Array | null;
  fftSize: number
}
export const usePlayerStore = (fileRefCallback: (prop: any) => void) => {
    
  const fileRef = ref<File | null>(null, (file) => {
    fileRefCallback(file);
  });


 const storeData = ref<StoreData>({
   arrayBuffer: new ArrayBuffer(0),
   audioContext: null,
   duration: 0,
   analyser: null,
   audioBuffer: null,
   dataArray: null,
   fftSize: 0
 })

 //@ts-ignore
 window.storeData = storeData;
  return {
    fileRef,
    storeData,
  }
};
