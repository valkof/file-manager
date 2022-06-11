import { access, readdir } from "fs/promises";
import { homedir } from "os";
import { dirname, isAbsolute, join } from "path";
import { env, stdin, stdout } from "process";
import { createFileCurrentDirectory } from "./fs/create.js";
import { readContentFile } from "./fs/read.js"
import { createAbsolutePath } from "./nav/path.js";
import { putPathToConsole } from "./nav/pathToConsole.js";

const args = process.argv[2];
env.rss_path = homedir();

function getUserName() {
  if (!args.startsWith('--username=') || args.length < 12) {
    console.log('Operation failed');
    process.exit(0);
  };
  return args[11].toUpperCase() + args.slice(12);
}

function exitFileManager(userName) {
  stdout.write(`Thank you for using File Manager, ${userName}!`);
  process.exit(0);
}

function changePathUpDir() {
  env.rss_path = dirname(env.rss_path);
}

export const startFileManager = async (userName) => {
  stdin.on('data', async (data) => {
    if (data.toString().trim() === '.exit') {
      exitFileManager(userName);
      putPathToConsole();
      return;
    }
    if (data.toString().trim() === 'up') {
      changePathUpDir();
      putPathToConsole();
      return;
    };
    if (data.toString().trim() === 'ls') {
      readdir(env.rss_path).then((dirents) => {
        console.log(dirents);

      });
      putPathToConsole();
      return;
    };
    if (data.toString().startsWith('cd ')) {
      let destinationPath = data.toString().trim().slice(3);
      if (!isAbsolute(destinationPath)) destinationPath = join(env.rss_path, destinationPath);
      const existDirectory = access(destinationPath).then(() => {
        env.rss_path = destinationPath;
        putPathToConsole();
      }).catch(() => {
        console.log('Operation failed');
        putPathToConsole();
      });
      
      return;
    };

    //Read file and print it's content in console
    if (data.toString().startsWith('cat ')) {
      const destinationPath = data.toString().trim().slice(4);
      const absDestinationPath = createAbsolutePath(destinationPath);
      await readContentFile(absDestinationPath).catch(() => {
        stdout.write('Invalid input\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Create empty file in current working directory
    if (data.toString().startsWith('add ')) {
      const nameFile = data.toString().trim().slice(4);
      const absDestinationPath = createAbsolutePath(`./${nameFile}`);
      await createFileCurrentDirectory(absDestinationPath).then(() => {
        stdout.write('The file is created\n');
      }).catch(() => {
        stdout.write('Invalid input\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    stdout.write('Invalid input\n');
    putPathToConsole();
  });
  process.on('SIGINT', () => exitFileManager(userName));
}

(async () => {
  const userName = getUserName();
  stdout.write(`Welcome to the File Manager, ${userName}!`);
  putPathToConsole();
  
  await startFileManager(userName);
})()