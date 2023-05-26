const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  test('returns partitionKey when it exists', () => {
    const event = { partitionKey: 'myKey' };
    const result = deterministicPartitionKey(event);
    expect(result).toBe('myKey');
  });

  test('returns hashed candidate when partitionKey is not present', () => {
    const event = { key1: 'value1', key2: 'value2' };
    const data = JSON.stringify(event);
    const expectedHash = crypto.createHash("sha3-512").update(data).digest("hex");
    const expectedPartitionKey = expectedHash.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(expectedHash).digest("hex")
      : expectedHash;
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedPartitionKey);
  });

  test('returns hashed candidate when partitionKey is not a string', () => {
    const event = { partitionKey: 123 };
    const data = JSON.stringify(event);
    const expectedHash = crypto.createHash("sha3-512").update(data).digest("hex");
    const expectedPartitionKey = expectedHash.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(expectedHash).digest("hex")
      : expectedHash;
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedPartitionKey);
  });

  test('returns trivial partitionKey when event is falsy', () => {
    const result = deterministicPartitionKey(null);
    expect(result).toBe(TRIVIAL_PARTITION_KEY);
  });

  test('returns hashed candidate when partitionKey exceeds MAX_PARTITION_KEY_LENGTH', () => {
    const event = { partitionKey: 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1) };
    const expectedHash = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    const expectedPartitionKey = expectedHash.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(expectedHash).digest("hex")
      : expectedHash;
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expectedPartitionKey);
  });
});
