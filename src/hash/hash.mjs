import { createHash } from "crypto";
import { readFile } from "fs/promises";

export const calculateHash = async (pathToFile) => {
  const hash = createHash('sha256');
  const hashHex = await readFile(pathToFile, 'utf-8').then((content) => {
    hash.update(content);
    return hash.digest('hex');
  }).catch((e) => {
    throw e;
  });
  return hashHex;
};