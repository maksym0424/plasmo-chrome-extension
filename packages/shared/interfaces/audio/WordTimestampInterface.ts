/**
 * The WordTimestamp interface represents a word transcribed from an audio recording,
 * along with the time in the recording at which the word was spoken.
 *
 * @interface
 * @property {string} word - The transcribed word.
 * @property {[number, number]} timestamp - A tuple representing the start and end times of the word in the recording.
 *                                          The first element is the start time in milliseconds, and the second element is the end time in milliseconds.
 * @property {boolean} is_good - if the word is good or not
 */
export interface WordTimestamp {
  word: string;
  timestamp: [number, number];
  // chunk_num: number,
  is_good: boolean;
  chunk_num: number,
  is_edge: boolean
}
