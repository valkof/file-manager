const args = process.argv[2];

function getUserName() {
  if (!args.startsWith('--username=') || args.length < 12) {
    console.log('Operation failed');
    process.exit(0);
  };
  return args[11].toUpperCase() + args.slice(12);
}

(async () => {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}`);
})()