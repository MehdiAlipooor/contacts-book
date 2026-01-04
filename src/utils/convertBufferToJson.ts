export function convertBufferToJson(buffer: Buffer) {
  return JSON.parse(buffer.toString());
}
