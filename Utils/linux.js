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
