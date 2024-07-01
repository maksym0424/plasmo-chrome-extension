import * as Sentry from "@sentry/react";
import { useEffect, useRef } from "react";
import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";
import config from "../config";
import type { BlobTimestampInterface } from "../interfaces/audio/BlobTimestampInterface";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";
import transcriptionConfig from "../transcription-config";
import { blobToBase64, final_transcription } from "../utils/audio";

export default function useRealTimeAudioTranscription() {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  // if (settings.debug) console.log("useRealTimeAudioTranscription");

  const TIME_SLICE_MS = transcriptionConfig.ara.time_slice_ms;
  const NEW_LINE_DELAY_MS = transcriptionConfig.ara.new_line_delay_ms;

  const recorderRef = useRef<RecordRTCPromisesHandler | null>(null);
  const wsRef = useRef<WebSocket>();
  const recordingTimeRef = useRef({ accumulatedRecordingTime: 0, lastRecordingStart: -1 });
  const streamRef = useRef<MediaStream>();
  const blobsRef = useRef<BlobTimestampInterface[]>(ui.blobs);
  const languageRef = useRef<string | null>(settings.transcriptionLanguage);

  async function processAudio(blob: Blob) {
    // if (settings.debug) console.log("Process audio: ", blob.size);
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
        const chunk_cnt = languageRef.current === "auto" ? blobsRef.current.length : transcriptionConfig.ara.slices_per_processing;

        const base64Audios = await Promise.all(blobsRef.current.slice(-chunk_cnt).map(async (blob) => blobToBase64(blob.blob)));

        if (wsRef.current && blobsRef?.current && blobsRef.current.length) {
          const length = blobsRef.current.length;
          const chunkStartNo = length >= chunk_cnt ? (length - chunk_cnt) : 0;
          const timestamp = length >= chunk_cnt ? blobsRef.current.at(-chunk_cnt)?.started_ms : blobsRef.current[0]?.started_ms;

          if (timestamp !== undefined) {
            wsRef.current.send(
              JSON.stringify({
                type: "audio",
                data: base64Audios,
                chunk_start_no: chunkStartNo,
                timestamp: timestamp,
              }),
            );
          }
        }
      }
      catch (e) {
        console.error(e);
        Sentry.captureException(e);
        await stopRecording();
      }
    }
  }

  // Update transcription when words change
  useEffect(() => {
    if (content.words.length) {
      // console.log(content.words);
      content.setTranscription(final_transcription(content.words, NEW_LINE_DELAY_MS));
    }
  }, [content.words, NEW_LINE_DELAY_MS]);

  const startRecording = async () => {
    if (settings.debug) console.log(`Start transcription with ${settings.transcribeBackend}`);

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: settings.inputSource,
        },
      });

      wsRef.current = new WebSocket(config.WEBSOCKET_URL);

      wsRef.current.onopen = async () => {
        if (settings.debug) console.log("WebSocket connection opened");

        ui.setIsRecording(true);

        if (streamRef.current) {
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

        if (wsRef.current) {
          wsRef.current.send(JSON.stringify({
            type: "config",
            data: {
              language: languageRef.current === "nb" ? "no" : languageRef.current,
              chunk_length_ms: transcriptionConfig.ara.time_slice_ms,
              language_probability_threshold: transcriptionConfig.ara.language_probability_threshold,
            },
          }));
        }
      };

      wsRef.current.onmessage = (event) => {
        if (settings.debug) console.log("WebSocket message");
        const data = JSON.parse(event.data);
        if (data.type === "word") {
          content.incrementResponses();
          content.addWords(data.data);
        }
        else if (data.type === "language") {
          console.log("Detected language: ", data.data);
          languageRef.current = data.data;
        }
      };

      wsRef.current.onerror = (event) => {
        console.error("WebSocket Error:", event);
        ui.setError("WebSocket Error");
        stopRecording();
      };
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

    if (wsRef.current) {
      wsRef.current.close();
    }
    wsRef.current = undefined;
  };

  return {
    startRecording,
    stopRecording,
  };
}
