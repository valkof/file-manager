import { env, stdout } from "process";

/**
 * Print the path from rss_parh of environment to console 
 */
export const putPathToConsole = () => {
  stdout.write('\n' + 'You are currently in ' + env.rss_path + '\n');
};
