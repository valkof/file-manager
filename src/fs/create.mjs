import { writeFile } from "fs/promises";

/**
 * Create empty file in current working directory
 * @param {string} pathToFile Path to file
 */
export const createFileCurrentDirectory = async (pathToFile) => {
  await writeFile(pathToFile, '', {
    flag: 'wx'
  }).catch((e) => {
    throw e;
  });
};