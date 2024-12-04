import { exec } from "child_process";

export function execExportLin() {
    exec("dpkg --get-selections", (error, stdout, stderr) => {
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

export function execRemoveLin(command, programName) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error removing the program!`, error);
            return;
        } else {
            console.log(`Uninstalled: ${programName}`);
        }
    });
}
