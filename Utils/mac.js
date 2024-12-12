import { exec } from "child_process";

export async function execExportMac() {
    return new Promise((resolve, reject) => {
        exec('ls /Applications', (error, stdout, stderr) => {
            if (error) {
                console.error(error.message);
                reject(error);
                return;
            } else if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject(`stderr: ${stderr}`);
                return;
            } else if (stdout) {
                let progArr = stdout.split("\r").map((el) => el.trim()).filter((el) => el !== "");
                resolve(progArr);
            }
        });
    });
}

export function execRemoveMac(programName) {
    let finalCommand = `osascript -e 'do shell script "sudo rm -rf /Applications/${programName}.app"' with administrator privileges`;
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
