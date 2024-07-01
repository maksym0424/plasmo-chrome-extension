import { create } from "zustand";
import type { BlobTimestampInterface } from "../interfaces/audio/BlobTimestampInterface";

export const Layouts = ["transcribe", "soap", "summary", "settings"] as const;
export type Layout = typeof Layouts[number];


interface UiStore {
  activeLayout: Layout;
  setActiveLayout: (layout: Layout) => void;

  audioInputs: MediaDeviceInfo[];
  setAudioInputs: (audioInputs: MediaDeviceInfo[]) => void;

  blobs: BlobTimestampInterface[];
  setBlobs: (blobs: BlobTimestampInterface[]) => void;
  addBlob: (blobs: BlobTimestampInterface) => void;

  error: string;
  setError: (error: string) => void;
  errorActive: boolean;
  setErrorActive: (errorActive: boolean) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  subjectiveLoading: boolean;
  setSubjectiveLoading: (loading: boolean) => void;
  objectiveLoading: boolean;
  setObjectiveLoading: (loading: boolean) => void;
  assessmentLoading: boolean;
  setAssessmentLoading: (loading: boolean) => void;
  planLoading: boolean;
  setPlanLoading: (loading: boolean) => void;
  summaryLoading: boolean;
  setSummaryLoading: (loading: boolean) => void;

  onboardingStep: number;
  setOnboardingStep: (onboardingStep: number) => void;

  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const useUiStore = create<UiStore>(
  (set) => ({
    activeLayout: "transcribe",
    setActiveLayout: (layout: Layout) => set({ activeLayout: layout }),

    audioInputs: [],
    setAudioInputs: (audioInputs: MediaDeviceInfo[]) => set({ audioInputs }),

    blobs: [],
    setBlobs: (blobs: BlobTimestampInterface[]) => set({ blobs }),
    addBlob: (blob: BlobTimestampInterface) => set((state) => ({ blobs: [...state.blobs, blob] })),

    error: "",
    setError: (error: string) => set({ error, errorActive: true }),
    errorActive: false,
    setErrorActive: (errorActive: boolean) => set({ errorActive }),

    loading: false,
    setLoading: (loading: boolean) => set({ loading }),

    subjectiveLoading: false,
    setSubjectiveLoading: (subjectiveLoading: boolean) => set({ subjectiveLoading }),
    objectiveLoading: false,
    setObjectiveLoading: (objectiveLoading: boolean) => set({ objectiveLoading }),
    assessmentLoading: false,
    setAssessmentLoading: (assessmentLoading: boolean) => set({ assessmentLoading }),
    planLoading: false,
    setPlanLoading: (planLoading: boolean) => set({ planLoading }),
    summaryLoading: false,
    setSummaryLoading: (summaryLoading: boolean) => set({ summaryLoading }),

    onboardingStep: 0,
    setOnboardingStep: (onboardingStep: number) => set({ onboardingStep }),

    isRecording: false,
    setIsRecording: (isRecording: boolean) => set({ isRecording }),
  }),
);

export default useUiStore;
