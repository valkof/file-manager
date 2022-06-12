import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";

export const calculateHash = async (pathToFile) => {
  const hash = createHash('sha256');
  const readStream = createReadStream(pathToFile);
  await pipeline(
    readStream,
    hash
  ).catch((e) => {
    throw e;
  });
  return hash.digest('hex');
};