import { create } from "zustand";
import type { WordTimestamp } from "../interfaces/audio";
import type { ChatMessage } from "../interfaces/chat";

interface contentStore {
  chatMessages: ChatMessage[];
  setChatMessages: (chatMessages: ChatMessage[]) => void;
  getChatMessages: () => ChatMessage[];

  subjective: string;
  setSubjective: (subjective: string) => void;

  objective: string;
  setObjective: (objective: string) => void;

  assessment: string;
  setAssessment: (assessment: string) => void;

  plan: string;
  setPlan: (plan: string) => void;

  responses: number;
  setResponses: (responses: number) => void;
  incrementResponses: () => void;

  summary: string;
  setSummary: (summary: string) => void;

  transcription: string;
  setTranscription: (transcription: string) => void;
  appendTranscription: (transcription: string) => void;
  transcriptionLongEnough: () => boolean;

  words: WordTimestamp[];
  setWords: (words: WordTimestamp[]) => void;
  addWords: (words: WordTimestamp[]) => void;

  reset: () => void;
}

const useContentStore = create<contentStore>(
  (set, get) => ({
    chatMessages: [],
    setChatMessages: (chatMessages: ChatMessage[]) => set({ chatMessages }),
    getChatMessages: () => get().chatMessages.slice(1),

    subjective: "",
    setSubjective: (subjective: string) => set({ subjective }),

    objective: "",
    setObjective: (objective: string) => set({ objective }),

    assessment: "",
    setAssessment: (assessment: string) => set({ assessment }),

    plan: "",
    setPlan: (plan: string) => set({ plan }),

    responses: 0,
    setResponses: (responses: number) => set({ responses }),
    incrementResponses: () => set((state) => ({ responses: state.responses + 1 })),

    summary: "",
    setSummary: (summary: string) => set({ summary }),

    transcription: "",
    setTranscription: (transcription: string) => set({ transcription }),
    appendTranscription: (transcription: string) => set((state) => ({ transcription: state.transcription + transcription + "\n" })),
    transcriptionLongEnough: () => get().transcription.length > 500,

    words: [],
    setWords: (words: WordTimestamp[]) => set({ words }),
    addWords: (words: WordTimestamp[]) => set((state) => {
      // Combining the new words with the existing words in the state
      let combinedWords = [...state.words];
      if (words.length > 0) {
        const first_chunk_no = words[0].chunk_num;

        // if first chunk not exist
        const first_index_chunk_exist = combinedWords.findIndex(word => word.chunk_num === first_chunk_no);
        if (first_index_chunk_exist === -1)
          combinedWords = combinedWords.concat(words.filter(word => word.chunk_num === first_chunk_no));

        const should_update_first_chunk = combinedWords.findIndex(word => word.chunk_num === first_chunk_no + 2);

        // if first chunk is a separate chunk, update it
        if (should_update_first_chunk === -1)
          combinedWords = combinedWords.filter((word) => word.chunk_num < first_chunk_no).concat(words.filter(word => word.chunk_num >= first_chunk_no));
        // else, update from the next chunk
        else
          combinedWords = combinedWords.filter((word) => word.chunk_num <= first_chunk_no).concat(words.filter(word => word.chunk_num > first_chunk_no));
      }

      // Sort the array based on the timestamp
      combinedWords.sort((a, b) => a.timestamp[0] - b.timestamp[0]);
      // console.log("Words", combinedWords);
      // Return the new state with updated words list
      return { words: combinedWords };
    }),

    reset: () => set({
      assessment: "",
      chatMessages: [],
      objective: "",
      plan: "",
      responses: 0,
      subjective: "",
      summary: "",
      transcription: "",
      words: [],
    }),
  }),
);

export default useContentStore;
