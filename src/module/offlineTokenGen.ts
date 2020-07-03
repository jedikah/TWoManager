import { OfflineTokenGenerator, TimeGenerator } from 'offline-token-generator';

class OfflineTokenGen extends OfflineTokenGenerator {
  constructor(
    key = 'OfflineTokenGenerator12814401',
    aesBits = 128,
    ttl = 12 * 60 * 60,
    tolerance = 1,
    timeGen?: TimeGenerator
  ) {
    super(key, aesBits, ttl, tolerance, timeGen);
  }
  read(crypto: string) {
    const json = this.doRead(0, crypto);
    if (json === null) {
      return null;
    }
    return json[1];
  }
}

export default OfflineTokenGen;
