const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function encodeUtf8(value: string): Uint8Array {
  return encoder.encode(value);
}

export function decodeUtf8(value: BufferSource): string {
  return decoder.decode(value);
}