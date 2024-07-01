import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const Backends = ["azure", "ara"] as const;
export type Backend = typeof Backends[number];

export type ConsultationType = "digital" | "physical";
export type Language = "da" | "en" | "nb" | "sv" | "auto";

export const models = [
  "gpt-35-turbo",
  "gpt-35-turbo-instruct",
  "gpt-4",
  "gpt-4-turbo",
] as const;

export const araModels = [
  "NorskGPT-Llama3-8b",
  "Meta-Llama-3-8B-Instruct",
] as const;

export type Model = typeof models[number];
export type AraModel = typeof araModels[number];

interface SettingsStore {
  advancedSettings: boolean;
  setAdvancedSettings: (advancedSettings: boolean) => void;

  companyName: string;
  setCompanyName: (companyName: string) => void;

  consultationType: ConsultationType;
  setConsultationType: (consultationType: ConsultationType) => void;

  debug: boolean;
  setDebug: (debug: boolean) => void;

  ehrSystem: string;
  setEhrSystem: (ehrSystem: string) => void;

  inputSource: string;
  setInputSource: (inputSource: string) => void;

  transcriptionLanguage: Language;
  setTranscriptionLanguage: (transcriptionLanguage: Language) => void;

  generationLanguage: Language;
  setGenerationLanguage: (language: Language) => void;

  uiLanguage: Language;
  setUiLanguage: (language: Language) => void;

  model: Model;
  setModel: (model: Model) => void;

  name: string;
  setName: (name: string) => void;

  soapBackend: Backend;
  setSoapBackend: (backend: Backend) => void;

  transcribeBackend: Backend;
  setTranscribeBackend: (backend: Backend) => void;
}

const useSettingsStore = create(persist<SettingsStore>(
  (set) => ({
    advancedSettings: false,
    setAdvancedSettings: (advancedSettings: boolean) => set({ advancedSettings }),

    companyName: "",
    setCompanyName: (companyName: string) => set({ companyName }),

    consultationType: "digital",
    setConsultationType: (consultationType: ConsultationType) => set({ consultationType }),

    debug: false,
    setDebug: (debug: boolean) => set({ debug }),

    ehrSystem: "",
    setEhrSystem: (ehrSystem: string) => set({ ehrSystem }),

    inputSource: "",
    setInputSource: (inputSource: string) => set({ inputSource }),

    transcriptionLanguage: "en",
    setTranscriptionLanguage: (transcriptionLanguage: Language) => set({ transcriptionLanguage }),

    generationLanguage: "en",
    setGenerationLanguage: (generationLanguage: Language) => set({ generationLanguage }),

    uiLanguage: "en",
    setUiLanguage: (uiLanguage: Language) => set({ uiLanguage }),

    model: "gpt-4-turbo",
    setModel: (model: Model) => set({ model }),

    name: "",
    setName: (name: string) => set({ name }),

    soapBackend: "azure",
    setSoapBackend: (backend: Backend) => set({ soapBackend: backend }),

    transcribeBackend: "azure",
    setTranscribeBackend: (backend: Backend) => set({ transcribeBackend: backend }),
  }),
  {
    name: "settings-storage",
    storage: createJSONStorage(() => localStorage),
  },
));

export default useSettingsStore;
