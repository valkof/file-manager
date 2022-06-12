import { createReadStream } from "fs";
import { stdout } from "process";
import { finished } from "stream";
import { promisify } from "util";

/**
 * Read the content from the file to console
 * @param {pathToFile} pathToFile Path to file 
 */
export const readContentFile = async (pathToFile) => {
  const readStream = createReadStream(pathToFile, 'utf-8');
  readStream.pipe(stdout);
  const finishStream = promisify(finished);
  await finishStream(readStream);
  stdout.write('\n');
};