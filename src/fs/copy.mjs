import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

/**
 * Copy file
 * @param {string} soursePath The old path to file
 * @param {string} destinationPath The new path to file
 */
export const copyFile = async (soursePath, destinationPath) => {
  await pipeline(
    createReadStream(soursePath),
    createWriteStream(destinationPath)
  ).catch((e) => {
    throw e;
  });
};