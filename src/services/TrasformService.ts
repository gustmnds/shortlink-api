export class TransformService {
  public static NumberToBase64(number: number): string {
    const buff = Buffer.alloc(4);
    buff.writeInt32LE(number);
    const size = Math.min(4, Math.floor(Math.log(number) / Math.log(255)) + 1);
    return buff.toString('base64url', 0, size);
  }

  public static Base64ToNumber(text: string): number {
    const buff = Buffer.concat([
      Buffer.from(text, 'base64'),
      Buffer.alloc(4),
    ]);

    return buff.readInt32LE();
  }
}
