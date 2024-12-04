import { exec } from "child_process";
import os from "os";
import http from "http";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execExportWin, execRemoveWin } from "./Utils/win32.js";
import { execExportMac, execRemoveMac} from "./Utils/mac.js"
import { execExportLin, execRemoveLin } from "./Utils/linux.js";

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    let filePath;
    if (req.url === "/") {
      filePath = "/index.html";
    } else {
      filePath = req.url;
    }

    const lastPath = path.join(__dirname, "public", filePath);

    const fileData = await fs.readFile(lastPath);
    const ext = path.extname(filePath);
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript' 
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fileData);
  } catch(err) {
    console.error(`An error ocurred when creating a server!`, err);
    return;
  }
});

(function compVars (){
  const operatingSystem = os.platform();
  const architecture = os.arch();
  const release = os.release();

  console.log(operatingSystem, architecture, release);

  let command;
  let programName = "Microsoft Edge";

  if (operatingSystem === 'win32') {
    command = `wmic product where name='${programName}' call uninstall`;
    execExportWin();
    execRemoveWin(command, programName);
  }else if (operatingSystem === "darwin") {
      command = `osascript -e 'do shell script "sudo rm -rf /Applications/${programName}.app"' with administrator privileges`;
      execExportMac();
      execRemoveMac(command, programName);
    } else if(operatingSystem === "linux") {
      command = `sudo apt remove ${programName}; // Replace 'apt' with your package manager`;
      execExportLin();
      execRemoveLin(command, programName)
    }



  // if (operatingSystem === "win32") {
  //   command = `wmic product where name='${programName}' call uninstall`
  // } else if (operatingSystem === "darwin") {
  //   command = `osascript -e 'do shell script "sudo rm -rf /Applications/${programName}.app"' with administrator privileges`
  // } else if(operatingSystem === "linux") {
  //   command = `sudo apt remove ${programName}; // Replace 'apt' with your package manager`
  // }

  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Failed to uninstall the program: ${programName}`);
  //     return;
  //   } else{
  //     console.log(`Uninstalled program: ${programName}`);
  //   }
  // });
})();


server.listen(port, () => {
  console.log(`Server listenig on port ${port}`);
});