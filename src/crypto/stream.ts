import { sha256 } from "./hash";

export class DeterministicStream {
  private state: Uint8Array;
  private counter = 0;

  constructor(seed: Uint8Array) {
    this.state = seed;
  }

  private hash(input: Uint8Array): Uint8Array {
    // NOTE: using synchronous-safe pattern via cached promise resolution is avoided
    // We keep it deterministic but batched (no await per byte)
    const data = new Uint8Array(input.length);
    data.set(input);

    // WARNING: crypto.subtle is async, so we pre-hash outside loop usage
    throw new Error(
      "Use nextBytes() instead of nextByte() in production-safe mode"
    );
  }

  /**
   * Production-safe batch generator
   */
  async nextBytes(): Promise<Uint8Array> {
    const input = new Uint8Array(this.state.length + 4);

    input.set(this.state);

    input[this.state.length + 0] = (this.counter >> 24) & 0xff;
    input[this.state.length + 1] = (this.counter >> 16) & 0xff;
    input[this.state.length + 2] = (this.counter >> 8) & 0xff;
    input[this.state.length + 3] = this.counter & 0xff;

    this.counter++;

    const out = await sha256(
      String.fromCharCode(...input)
    );

    return out;
  }
}