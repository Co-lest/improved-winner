import http from "http";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
// import { execExportWin, execRemoveWin } from "./Utils/win32.js";
// import { execExportMac, execRemoveMac} from "./Utils/mac.js"
// import { execExportLin, execRemoveLin } from "./Utils/linux.js";
import { WebSocketServer } from "ws";

const port = process.env.PORT;

let programsObj;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "GET") {
      let filePath = "/index.html";
      // if (req.url === "/") {
      //   filePath = "/index.html";
      // } else {
      //   filePath = req.url;
      // }

      const fullPath = path.join(__dirname, "public", filePath); 
      const content = await fs.readFile(fullPath); 

      const ext = path.extname(filePath);
      const contentType = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
      }[ext] || "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content); 
      connectWebserver();
    }

  } catch (err) {
    console.error("An error occurred when creating a server!", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error"); 
  }
});

const connectWebserver = () => {
  const wss = new WebSocketServer({ server });

  wss.addListener("connection", (ws) => {
    console.log(`A client connected`);
    // compVars();
    ws.addEventListener("message", () => {});
  });
};

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
};

server.listen(port, () => {
  console.log(`Server listenig on port ${port}`);
});
