import { exec } from "child_process";

export function execExportWin() {
  exec(
    'powershell "Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName"',
    (error, stdout, stderr) => {
      if (error) {
        console.error(error.message);
        return;
      } else if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      } else if (stdout) {
        let output = stdout.split("\r");
        output.forEach((el) => {
            if (el.trim() !== "\n") {
                console.log(`Program: ${el.trim()}`);
            }
        });
        // console.log(typeof output); // object
        return output
      }
    }
  );
}

export function execRemoveWin(command, programName) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error removing the program!`, error);
      return;
    } else {
      console.log(`Uninstalled: ${programName}`);
      console.log(stdout);
    }
  });
}
