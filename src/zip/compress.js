import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

export const compress = async (pathToSourceFile, pathToDestinationFile) => {
  await pipeline(
    createReadStream(pathToSourceFile),
    createBrotliCompress(),
    createWriteStream(pathToDestinationFile)
  ).catch((e) => {
    throw e;
  });
};