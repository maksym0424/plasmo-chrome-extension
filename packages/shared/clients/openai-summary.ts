import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import config from "../config";
import type { Language } from "../state/settingsStore";

interface OpenAISummaryParams {
  transcription: string;
  language: Language;
  debug: boolean;
}

export async function OpenAISummary({ transcription, language, debug }: OpenAISummaryParams): Promise<string | null> {
  if (debug) console.log(`OpenAISummary: ${language}`);

  const client = new OpenAIClient(
    config.AZURE_OPENAI_ENDPOINT_SE,
    new AzureKeyCredential(config.AZURE_OPENAI_KEY_SE),
  );

  function getPrompt(language: Language) {
    if (language === "en") {
      return `
      You are a doctor who has carried out and transcribed a consultation, and will write a summary that the patient will take home.
      DO NOT write names and other identifiable information.
      Give only the answer, no extra information such as headings.
      Write the answer in English.`;
    }
    else if (language === "nb") {
      return `
      Du er en lege som har utført og transkribert en konsultasjon, og skal skrive en oppsummering som pasienten skal få med hjem.
      IKKE skriv navn og annen identifiserbar informasjon.
      Gi kun svaret, ingen ekstra informasjon som overskrifter.
      Skriv svaret på norsk.`;
    }
    else if (language === "sv") {
      return `
      Du är en läkare som har genomfört och transkriberat en konsultation och ska skriva en sammanfattning som patienten ska få med sig hem.
      SKRIV INTE namn och annan identifierbar information.
      Ge endast svaret, ingen extra information som rubriker.
      Skriv svaret på svenska.`;
    }
    else if (language === "da") {
      return `
      Du er en læge, der har udført og transskriberet en konsultation, og skal skrive en opsummering, som patienten skal have med hjem. 
      SKRIV IKKE navn og anden identificerbar information. 
      Giv kun svaret, ingen ekstra information som overskrifter. 
      Skriv svaret på dansk.`;
    }
  }

  const { choices } = await client.getChatCompletions(
    "gpt-4-turbo",
    [
      {
        role: "system",
        content: getPrompt(language),
      },
      {
        role: "user",
        content: transcription,
      },
    ], {
      maxTokens: 1000,
    });

  return choices[0].message?.content || null;
}
