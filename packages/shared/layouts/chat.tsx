import { Card, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useGpt4Chat } from "../hooks/use-gpt4-chat";
import { useTranslation } from "../i18n/config";
import type { ChatMessage } from "../interfaces/chat";
import useContentStore from "../state/contentStore";
import { cardContainerStyle } from "../styles";

export default function Chat() {
  const content = useContentStore();

  const { t } = useTranslation();

  const [message, setMessage] = useState("");
  const { sendMessage } = useGpt4Chat();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(message);

      console.log("Message sent:", message);
      console.log(content.chatMessages)

      // Clear the input field after sending the message
      content.setTranscription("");
    }
    catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
      setMessage("");
    }
  };

  return (
    <Card sx={cardContainerStyle}>
      <Stack>
        {content.getChatMessages().map(message => <Message {...message} />)}

        <div style={{ bottom: 75, position: "fixed", width: "90%", marginBottom: 4 }}>
          <TextField
            multiline
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: "white" }}
          />

          <div style={{ textAlign: "center", color: "#b4b4b4" }}>
            {t("mistakes")}
          </div>
        </div>
      </Stack>
    </Card>
  );
}

function Message({ role, content }: ChatMessage) {
  if (role === "user") {
    return (
      <p style={{ textAlign: "right", fontSize: 18 }}>{content}</p>
    );
  }
  return (
    <p style={{ textAlign: "left", fontSize: 20, lineHeight: 1.5 }}>{content}</p>
  );
}
