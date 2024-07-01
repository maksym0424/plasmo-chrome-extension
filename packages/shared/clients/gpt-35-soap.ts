// TODO: Move backend

import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import config from "../config";
import type { Language, Model } from "../state/settingsStore";

interface OpenAISoapParams {
  text: string;
  language: Language;
  model: Model;
  debug: boolean;
}

export async function Gpt35Soap({ text, language, model, debug }: OpenAISoapParams): Promise<string> {
  if (debug) console.log(`OpenAISoap: ${language}, ${model}`);

  const client = new OpenAIClient(
    config.AZURE_OPENAI_ENDPOINT_SE,
    new AzureKeyCredential(config.AZURE_OPENAI_KEY_SE),
  );

  const soapPrompts = {
    en: [`
    Transform the provided medical transcription into a SOAP note format, ensuring that no additional information is included beyond what is given in the text. Please write the SOAP note in English. Leave out name, gender and other personal information.
    Here's the transcription to be converted:
    """"""
    ${text}
    """"""

    Please format your response as follows:

    Subjective:
    [Your content here based on the transcription]
    
    Objective:
    [Your content here based on the transcription]
    
    Assessment:
    [Your content here based on the transcription]
    
    Plan:
    [Your content here based on the transcription]´
    
    SOAP Note:
  `],
    nb: [`
    Omgjør den oppgitte medisinske transkripsjonen til et SOAP-notatformat, og sørg for at ingen ekstra informasjon inkluderes utover det som er gitt i teksten. Vennligst skriv SOAP-notatet på norsk. Utelat navn, kjønn og annen personlig informasjon.
    Her er transkripsjonen som skal konverteres:
    """"""
    ${text}
    """"""
    
    Vennligst formater svaret ditt som følger:

    Subjective:
    [Ditt innhold her basert på transkripsjonen]
    
    Objective:
    [Ditt innhold her basert på transkripsjonen]
    
    Assessment:
    [Ditt innhold her basert på transkripsjonen]
    
    Plan:
    [Ditt innhold her basert på transkripsjonen]
    
    SOAP-notat:
    `],
  };

  const { choices } = await client.getCompletions(
    model,
    soapPrompts[language], {
      maxTokens: 1000,
    });

  return choices[0].text;
}
