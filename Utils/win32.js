import { exec } from 'child_process';

export async function execExportWin() {
  return new Promise((resolve, reject) => {
    exec(
      'powershell "Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName"',
      (error, stdout, stderr) => {
        if (error) {
          console.error(error.message);
          reject(error);
          return;
        } else if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject(new Error(`stderr: ${stderr}`));
          return;
        } else if (stdout) {
          let progArr = stdout.split("\r").map((el) => el.trim()).filter((el) => el !== "");
          resolve(progArr);
        }
      }
    );
  });
}

export async function execRemoveWin(programName) {
  let finalCommand = `wmic product where name='${programName}' call uninstall`;
  return new Promise((resolve, reject) => {
    exec(finalCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error removing the program!`, error);
        reject(`Error removing the program!`, error)
        return;
    } 
    if (stderr) {
        console.log(`Error uninstalling program ${programName}`);
        reject(stderr);
        return
    }
    if (stdout) {
        console.log(`Uninstalled output: ${stdout}`);
        resolve(`Uninstalled: ${programName}`);
    }
    });
  });
}
