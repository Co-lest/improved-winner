import { exec } from "child_process";

export async function execExportLin() {
    return new Promise((resolve, reject) => {
        exec("dpkg --get-selections", (error, stdout, stderr) => {
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
        });
    });
}

export function execRemoveLin(programName) {
    let finalCommand = `sudo apt remove ${programName}`;
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
                console.log(`Uninstall output: ${stdout}`);
                resolve(`Uninstalled: ${programName}`);
            }
        });
    });
}
