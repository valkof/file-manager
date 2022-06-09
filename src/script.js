import { homedir } from "os";
import { dirname } from "path";
import { env, stdin, stdout } from "process";

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

function putPathToConsole() {
  stdout.write('\n' + 'You are currently in ' + env.rss_path + '\n');
}

async function startFileManager(userName) {
  stdin.on('data', (data) => {
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
    stdout.write('Invalid input\n');
    putPathToConsole();
  });
  process.on('SIGINT', () => exitFileManager(userName));
}

(async () => {
  const userName = getUserName();
  stdout.write(`Welcome to the File Manager, ${userName}`);
  putPathToConsole();
  
  await startFileManager(userName);
})()