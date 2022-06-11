import { readFile } from "fs/promises";

/**
 * Read the content from the file to console
 * @param {pathToFile} pathToFile Path to file 
 */
export const readContentFile = async (pathToFile) => {
  await readFile(pathToFile, 'utf-8').then((content) => {
    console.log(content);
  }).catch((e) => {
    throw e;
  })
};