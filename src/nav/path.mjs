import { isAbsolute, join } from "path";
import { env } from "process";

/**
 * 
 * @param {string} pathToObject Path to file or directory
 * @returns {string} Absolute path to file or directory
 */
export const createAbsolutePath = (pathToObject) => {
  let absolutePathToObject = pathToObject;
  
  if (!isAbsolute(pathToObject)) {
    absolutePathToObject = join(env.rss_path, pathToObject);
  };
  
  return absolutePathToObject;
};

      