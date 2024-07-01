import type { WordTimestamp } from "../interfaces/audio";

/**
 * Converts a Blob object to a base64 string.
 *
 * This function creates a new FileReader object and uses it to read the Blob object as a data URL.
 * The FileReader object is asynchronous, so a Promise is returned that resolves with the base64 string
 * when the read operation is complete.
 *
 * If an error occurs during the read operation, the Promise is rejected with the error.
 *
 * @param blob - The Blob object to convert to a base64 string.
 * @returns A Promise that resolves with the base64 string, or rejects with an error.
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const final_transcription = (words: WordTimestamp[], newLineDelayms: number = 500) => {
  return words.reduce((sentence, currentWord, i) => {
    if (i === 0) {
      return currentWord.word;
    }

    const prevEndTime = words[i - 1].timestamp[1];
    const currStartTime = currentWord.timestamp[0];

    if (currStartTime - prevEndTime > newLineDelayms) {
      return sentence + "\n\n" + currentWord.word;
    }
    else {
      return sentence + " " + currentWord.word;
    }
  }, "");
};
