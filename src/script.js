import { access, readdir } from "fs/promises";
import { homedir } from "os";
import { basename, dirname, isAbsolute, join } from "path";
import { env, stdin, stdout } from "process";
import { createFileCurrentDirectory } from "./fs/create.mjs";
import { readContentFile } from "./fs/read.mjs"
import { renameFile } from "./fs/rename.mjs";
import { copyFile } from "./fs/copy.mjs";
import { createAbsolutePath } from "./nav/path.js";
import { putPathToConsole } from "./nav/pathToConsole.js";
import { deleteFile } from "./fs/delete.mjs";
import { getInfoAboutOs } from "./os/key.js";
import { calculateHash } from "./hash/hash.mjs";
import { compress } from "./zip/compress.mjs";
import { decompress } from "./zip/decompress.mjs";

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
    const [command, option1, option2] = data.toString().trim().split(' ').filter((arg) => !!arg);

    if (command === '.exit') {
      exitFileManager(userName);
      putPathToConsole();
      return;
    }
    if (command === 'up') {
      changePathUpDir();
      putPathToConsole();
      return;
    };
    if (command === 'ls') {
      readdir(env.rss_path).then((dirents) => {
        console.log(dirents);

      });
      putPathToConsole();
      return;
    };
    if (command === 'cd') {
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
    if (command === 'cat') {
      const sourсePath = option1;
      const absSourсePath = createAbsolutePath(sourсePath);
      await readContentFile(absSourсePath).catch(() => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Create empty file in current working directory
    if (command === 'add') {
      const nameFile = option1;
      const absDestinationPath = createAbsolutePath(`./${nameFile}`);
      await createFileCurrentDirectory(absDestinationPath).then(() => {
        stdout.write('The file is created\n');
      }).catch(() => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Rename file
    if (command === 'rn') {
      const destinationPath = option1;
      const nameFile = option2;
      const absDestinationPath = createAbsolutePath(destinationPath);
      const newAbsDestinationPath = join(dirname(absDestinationPath), nameFile);
      await renameFile(absDestinationPath, newAbsDestinationPath).then(() => {
        stdout.write('The file is renamed\n');
      }).catch(() => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Copy file
    if (command === 'cp') {
      const soursePath = option1;
      const destinationPath = option2;
      const absSourcePath = createAbsolutePath(soursePath);
      const absDestinationPath = join(createAbsolutePath(destinationPath), basename(absSourcePath));
      await copyFile(absSourcePath, absDestinationPath).then(() => {
        stdout.write('The file is copied\n');
      }).catch(() => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Delete file
    if (command === 'rm') {
      const soursePath = option1;
      const absSourcePath = createAbsolutePath(soursePath);
      await deleteFile(absSourcePath).then(() => {
        stdout.write('The file is deleted\n');
      }).catch(() => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Move file
    if (command === 'mv') {
      const soursePath = option1;
      const destinationPath = option2;
      const absSourcePath = createAbsolutePath(soursePath);
      const absDestinationPath = join(createAbsolutePath(destinationPath), basename(absSourcePath));
      try {
        await copyFile(absSourcePath, absDestinationPath);
        await deleteFile(absSourcePath).then(() => {
          stdout.write('The file is moved\n');
        });
      } catch {
        stdout.write('Operation failed\n');
      } finally {
        putPathToConsole();
      };
      return;
    };

    //Get EOL
    if (command === 'os') {
      const key = option1;
      await getInfoAboutOs(key).catch((e) => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Calculate hash
    if (command === 'hash') {
      const soursePath = option1;
      const absSourcePath = createAbsolutePath(soursePath);
      await calculateHash(absSourcePath).then((hex) => {
        stdout.write(`${hex}\n`);
      }).catch((e) => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Compress file (using Brotli algorithm)
    if (command === 'compress') {
      const soursePath = option1;
      const destinationPath = option2;
      const absSourcePath = createAbsolutePath(soursePath);
      const absDestinationPath = join(createAbsolutePath(destinationPath), basename(absSourcePath));
      await compress(absSourcePath, absDestinationPath).then(() => {
        stdout.write('The file is compressed\n');
      }).catch(() => {
        stdout.write('Operation failed\n');
      }).finally(() => {
        putPathToConsole();
      });
      return;
    };

    //Decompress file (using Brotli algorithm)
    if (command === 'decompress') {
      const soursePath = option1;
      const destinationPath = option2;
      const absSourcePath = createAbsolutePath(soursePath);
      const absDestinationPath = join(createAbsolutePath(destinationPath), basename(absSourcePath));
      await decompress(absSourcePath, absDestinationPath).then(() => {
        stdout.write('The file is decompressed\n');
      }).catch(() => {
        stdout.write('Operation failed\n');
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