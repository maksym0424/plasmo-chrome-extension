/**
 * The BlobTimestampInterface represents a multimedia Blob object along with a started time
 *
 * @interface
 * @property {Blob} blob - A Blob object representing multimedia content.
 * @property {number} timestamp - started time in ms
 */
export interface BlobTimestampInterface {
    blob: Blob;
    started_ms: number;
  }
  