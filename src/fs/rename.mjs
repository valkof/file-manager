import { rename } from "fs/promises";

/**
 * Rename file
 * @param {string} pathToOldFile Path to file with old name
 * @param {string} pathToNewFile Path to file with new name
 */
export const renameFile = async (pathToOldFile, pathToNewFile) => {
  await rename(pathToOldFile, pathToNewFile).catch((e) => {
    throw e;
  });
};