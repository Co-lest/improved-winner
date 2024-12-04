import { exec } from "child_process";

export function execExportWin() {
    exec('powershell "Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName"', (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return;
        } else if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        } else if (stdout) {
            console.log(stdout);
        }
    });
}

export function execRemoveWin(command, programName) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error removing the program!`, error);
            return;
        } else {
            console.log(`Uninstalled: ${programName}`);
        }
    });
}

