import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import useSettingsStore from "../state/settingsStore";
import useUiStore from "../state/uiStore";

export default function InputSourceSelector() {
  const settings = useSettingsStore();
  const ui = useUiStore();

  const getMicrophoneDevices = async () => {
    console.log("getMicrophoneDevices");
    try {
      // Request microphone access to prompt the user if not already granted
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Enumerate all audio input devices.
      // Must be done before stopping the stream to get labels in Firefox.
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Stop the stream immediately to avoid active recording
      stream.getTracks().forEach(track => track.stop());

      return devices.filter(device => device.kind === "audioinput");
    }
    catch (err) {
      throw new Error("Microphone access denied.");
    }
  };

  useEffect(() => {
    if (ui.audioInputs.length) return;
    getMicrophoneDevices()
      .then(devices => {
        ui.setAudioInputs(devices);
        settings.setInputSource(devices[0].deviceId);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <FormControl>
      <Select
        value={settings.inputSource}
        onChange={(val) => settings.setInputSource(val.target.value as string)}
        variant="standard"
        size="small"
      >
        {ui.audioInputs.map(input => (
          <MenuItem key={input.deviceId} value={input.deviceId}>{input.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
