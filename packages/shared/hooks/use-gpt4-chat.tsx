import openAiClient from "../clients/openAiClient";
import type { Role } from "../interfaces/chat";
import useContentStore from "../state/contentStore";
import useSettingsStore from "../state/settingsStore";

export function useGpt4Chat() {
  const content = useContentStore();
  const settings = useSettingsStore();

  async function sendMessage(message: string) {
    const chatMessages = content.chatMessages;

    if (content.chatMessages.length === 0) {
      chatMessages.push({
        role: "system",
        content: `
        Du er en erfaren lege, som svarer på spørsmål fra andre leger.
        Du er hjelpsom og høflig. Når du er usikker, si at du ikke vet.
        `,
      });
    }

    chatMessages.push({
      role: "user",
      content: message,
    });

    const { choices } = await openAiClient.getChatCompletions(
      settings.model,
      chatMessages,
      {
        maxTokens: 1000,
      });

    if (choices[0].message) {
      chatMessages.push({
        role: choices[0].message.role as Role,
        content: choices[0].message.content || "",
      });

      content.setChatMessages(chatMessages);
    }
  }

  return {
    sendMessage,
  };
}
