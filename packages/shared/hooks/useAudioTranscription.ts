import * as Sentry from "@sentry/react";
import { useRef } from "react";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";
import openAiClient from "../clients/openAiClient";
import type { BlobTimestampInterface } from "../interfaces/audio/BlobTimestampInterface";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";
import config from "../transcription-config";

export default function useAudioTranscription() {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  if (settings.debug) console.log("useAudioTranscription");

  const TIME_SLICE_MS = config.azure.time_slice_ms;
  const NEW_LINE_DELAY_MS = config.azure.new_line_delay_ms;

  const recorderRef = useRef<RecordRTCPromisesHandler | null>(null);
  const recordingTimeRef = useRef({ accumulatedRecordingTime: 0, lastRecordingStart: -1 });
  const streamRef = useRef<MediaStream | null>(null);
  const blobsRef = useRef<BlobTimestampInterface[]>(ui.blobs);

  async function processAudio(blob: Blob) {
    if (settings.debug) console.log("Process audio: ", blob.size);
    if (blob.size > 0) {
      const blobTimestamp: BlobTimestampInterface = {
        blob: blob,
        started_ms: recordingTimeRef.current.accumulatedRecordingTime +
          Date.now() -
          recordingTimeRef.current.lastRecordingStart,  // Current timestamp in milliseconds
      };

      blobsRef.current = [...blobsRef.current, blobTimestamp];
      ui.addBlob(blobTimestamp);

      try {
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const response = await openAiClient.getAudioTranscription("whisper", uint8Array, {
          language: settings.transcriptionLanguage === "nb" ? "no" : settings.transcriptionLanguage,
        });
        const result = response.text;
        if (settings.debug) console.log(`Transcription result: ${result}`);
        content.appendTranscription(result);
        content.incrementResponses();
      }
      catch (e) {
        console.error(e);
        Sentry.captureException(e);
      }
    }
  }

  const startRecording = async () => {
    if (settings.debug) console.log(`Start transcription with Azure`);

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: settings.inputSource,
        },
      });

      ui.setIsRecording(true);

      recorderRef.current = new RecordRTCPromisesHandler(streamRef.current, {
        type: "audio",
        recorderType: StereoAudioRecorder,
        mimeType: "audio/wav",
        timeSlice: TIME_SLICE_MS,
        numberOfAudioChannels: 1, // Reduced channels to 1 for smaller size
        ondataavailable: processAudio,
      });

      recordingTimeRef.current.lastRecordingStart = Date.now();
      await recorderRef.current.startRecording();
    }
    catch (e) {
      console.error(e);
      Sentry.captureException(e);
      ui.setError("Error starting transcription. Make sure microphone access is allowed from the extension settings.");
    }
  };

  const stopRecording = async () => {
    if (settings.debug) console.log("Stop transcription");

    ui.setIsRecording(false);

    if (recorderRef.current) {
      await recorderRef.current.stopRecording();

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const accumulatedTime = recordingTimeRef.current.accumulatedRecordingTime +
        (Date.now() - recordingTimeRef.current.lastRecordingStart);
      recordingTimeRef.current = {
        lastRecordingStart: -1,
        accumulatedRecordingTime: accumulatedTime,
      };
    }
    recorderRef.current = null;
  };

  return {
    startRecording,
    stopRecording,
  };
}
