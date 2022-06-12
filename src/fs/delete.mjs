import { rm } from "fs/promises";

/**
 * Delete file
 * @param {string} pathToFile Path to file
 */
export const deleteFile = async (pathToFile) => {
  await rm(pathToFile).catch((e) => {
    throw e;
  }) 
};