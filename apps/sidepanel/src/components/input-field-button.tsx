import MicIcon from "@mui/icons-material/Mic";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import useRealTimeAudioTranscription from "shared/hooks/useRealTimeAudioTranscription";
import useContentStore from "shared/state/contentStore";
import useSettingsStore from "shared/state/settingsStore";
import useUiStore from "shared/state/uiStore";

const MicButton = ({ inputField }) => {
  const content = useContentStore();
  const settings = useSettingsStore();
  const ui = useUiStore();

  // Use the `useRealTimeAudioTranscription` hook to manage the recording and transcription state
  const { startRecording, stopRecording } = useRealTimeAudioTranscription();

  useEffect(() => {
    console.log(content.transcription);
    if (inputField && (inputField.tagName.toLowerCase() === "input" || inputField.tagName.toLowerCase() === "textarea") && ui.isRecording)
      inputField.value = content.transcription;
  }, [content.transcription]);

  const handleClick = () => {
    console.log(inputField);

    if (!ui.isRecording) content.setWords([]);

    ui.setIsRecording(!ui.isRecording);
  };

  // Choose the icon based on the recording state
  const Icon = ui.isRecording ? MicIcon : MicOutlinedIcon;
  // Change the color based on the recording state
  const color = ui.isRecording ? "secondary" : "default";

  return (
    <IconButton color={color} size="large" onClick={handleClick}>
      <Icon fontSize="large" />
    </IconButton>
  );
};

export default function InputFieldButton(inputField) {
  const micButtonContainer = document.createElement('div');
  micButtonContainer.style.position = 'relative'; // Ensure the container is positioned relatively
  inputField.style.position = 'relative'; // Ensure the input field itself is positioned relatively
  inputField.parentNode.insertBefore(micButtonContainer, inputField.nextSibling);

  const root = createRoot(micButtonContainer); // Create a root for the container
  root.render(<MicButton inputField={inputField} />); // Mount the React component using createRoot
};
