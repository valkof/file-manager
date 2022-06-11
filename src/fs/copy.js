import * as fsp from "fs/promises";

/**
 * Copy file
 * @param {string} soursePath The old path to file
 * @param {string} destinationPath The new path to file
 */
export const copyFile = async (soursePath, destinationPath) => {
  await fsp.copyFile(soursePath, destinationPath).catch((e) => {
    throw e;
  });
};