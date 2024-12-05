import os from "os";
import http from "http";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execExportWin, execRemoveWin } from "./Utils/win32.js";
import { execExportMac, execRemoveMac} from "./Utils/mac.js"
import { execExportLin, execRemoveLin } from "./Utils/linux.js";
import { WebSocketServer } from "ws";

const port = process.env.PORT;

let programsObj;

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
    connectWebserver();
  } catch(err) {
    console.error(`An error ocurred when creating a server!`, err);
    return;
  }
});

const connectWebserver = () => {
  const wss = new WebSocketServer( { server } );

  wss.addListener("connection", (ws) => {
    console.log(`A client connected`);
    // compVars();
    // ws.addEventListener("");
  });
}

const compVars = () => {
  // const operatingSystem = os.platform();
  // const architecture = os.arch();
  // const release = os.release();

  // console.log(operatingSystem, architecture, release);

  // let command;
  // let programName = "Microsoft Edge";

  // if (operatingSystem === 'win32') {
  //   command = `wmic product where name='${programName}' call uninstall`;
  //   programsObj = execExportWin();
  //   execRemoveWin(command, programName);
  // }else if (operatingSystem === "darwin") {
  //     command = `osascript -e 'do shell script "sudo rm -rf /Applications/${programName}.app"' with administrator privileges`;
  //     execExportMac();
  //     execRemoveMac(command, programName);
  //   } else if(operatingSystem === "linux") {
  //     command = `sudo apt remove ${programName}`;
  //     execExportLin();
  //     execRemoveLin(command, programName)
  //   }
}


server.listen(port, () => {
  console.log(`Server listenig on port ${port}`);
});