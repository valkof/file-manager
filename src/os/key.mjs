import { arch, cpus, EOL, homedir, userInfo } from "os";

export const getInfoAboutOs = async (key) => {
  switch (key) {
    case '--EOL':
      const eol = JSON.stringify(EOL);
      console.log(eol);
      break;
    case '--cpus':
      const myCpus = cpus();
      console.log(`overall amount of CPUS - ${myCpus.length}`);
      myCpus.forEach((Cpus, num) => {
        console.log(`${num + 1} - ${Cpus.model} - ${Cpus.speed / 1000} GHz`);
      });
      break;
    case '--homedir':
      const homedirectory = homedir();
      console.log(homedirectory);
      break;
    case '--username':
      const userName = userInfo().username;
      console.log(userName);
      break;
    case '--architecture':
      const archi = arch();
      console.log(archi);
      break;
    default:
      try {
        throw new Error();
      } catch(e) {
        throw e;
      }
  };
};