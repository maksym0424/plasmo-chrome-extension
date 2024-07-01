import type { Language } from "../state/settingsStore";

export interface GetSoapParams {
  companyName?: string,
  consultationType?: string,
  debug: boolean;
  language: Language;
  transcription: string;
}
