import { Language } from "shared/state/settingsStore";

export interface APIRequestParams {
  transcription: string;
  language: Language;
}
