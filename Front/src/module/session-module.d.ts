declare module 'offline-token-generator' {
  export interface TimeGenerator {
    getTime(): number;
  }
  export class OfflineTokenGenerator<T = {}> {
    private key;
    private aesBits;
    private ttl;
    private tolerance;
    private timeGen;
    constructor(
      key: string,
      aesBits: number,
      ttl?: number,
      tolerance?: number,
      timeGen?: TimeGenerator
    );
    private getCurrentTime;
    private getKey;
    generate(value: T): string;
    public doRead;
    public read(crypto: string): T;
  }
}
