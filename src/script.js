import { env, stdin, stdout } from "process";

const args = process.argv[2];

function getHomedir() {
  return env.HOME || env.USERPROFILE;
}

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

async function startFileManager(userName) {
  stdin.on('data', (data) => {
    if (data.toString().trim() === '.exit') exitFileManager(userName);
    stdout.write('\n' + 'You are currently in ' + getHomedir() + '\n');
  });
  process.on('SIGINT', () => exitFileManager(userName));
}

(async () => {
  const userName = getUserName();
  stdout.write(`Welcome to the File Manager, ${userName}`);
  stdout.write('\n' + 'You are currently in ' + getHomedir() + '\n');
  await startFileManager(userName);
})()