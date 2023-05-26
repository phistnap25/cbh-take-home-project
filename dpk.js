const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (event && event.partitionKey) {
    let candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    return candidate.length > MAX_PARTITION_KEY_LENGTH
      ? crypto.createHash("sha3-512").update(candidate).digest("hex")
      : candidate;
  }

  const data = JSON.stringify(event || {});
  const candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash("sha3-512").update(candidate).digest("hex")
    : candidate || TRIVIAL_PARTITION_KEY;
};
