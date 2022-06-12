import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliDecompress } from "zlib";

export const decompress = async (pathToSourceFile, pathToDestinationFile) => {
  await pipeline(
    createReadStream(pathToSourceFile),
    createBrotliDecompress(),
    createWriteStream(pathToDestinationFile)
  ).catch((e) => {
    throw e;
  });
};