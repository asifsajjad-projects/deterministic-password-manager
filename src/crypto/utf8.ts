const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Always return ArrayBuffer (WebCrypto-compatible)
 */
export function encodeUtf8(value: string): ArrayBuffer {
  return encoder.encode(value).buffer;
}

export function decodeUtf8(value: BufferSource): string {
  return decoder.decode(value);
}