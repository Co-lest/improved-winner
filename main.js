import http from "http";
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

import { execExportWin, execRemoveWin} from "./utils/win32.js";
import { execExportMac, execRemoveMac } from "./utils/mac.js";
import { execExportLin, execRemoveLin } from "./utils/linux.js";

const port = process.env.PORT;
var operatingSys;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    console.log(`Incoming Request: ${req.method} ${req.url}`); 
    // Log request details for easier debugging

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let filePath;

    if (req.method === "GET") {
      if (req.url === "/") {
        filePath = `index.html`;
        const fullPath = path.join(__dirname, "public", filePath);
        console.log(fullPath);

        const content = await fs.readFile(fullPath);
        const ext = path.extname(filePath);
        const contentType =
          {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript",
          }[ext] || "text/plain";

        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      } else if (req.url === "/favicon.ico") {

      } else {
        console.log("Serving static file:", req.url); // Log static file requests
        filePath = req.url.substring(1);
        let filePathArr = filePath.split("/");
        // console.log(filePathArr);
        let fullPath;
        if (filePathArr[0] === "utils") {
          fullPath = path.join(__dirname, "utils", filePathArr[1]);
          console.log(`Static file file path ${fullPath}`);
        } else {
          fullPath = path.join(__dirname, "public", filePath);
          console.log(`Static file file path ${fullPath}`);
        }
        try {
          const content = await fs.readFile(fullPath);
          const ext = path.extname(filePath);
          const contentType =
            {
              ".html": "text/html",
              ".css": "text/css",
              ".js": "text/javascript",
            }[ext] || "text/plain";

          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        } catch (err) {
          console.error(`Error serving static file: ${req.url}`, err);
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("File Not Found");
        }
      }
    }
  } catch (err) {
    console.error("An error occurred when creating a server!", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

const wss = new WebSocketServer( { server } );


wss.on("connection", (ws) => {
  let programs;
  console.log(`A client connected`);

  ws.on("message", (message) => {
    operatingSys = message.toString();

    if (operatingSys === 'Win') {
      (async () => {
        try {
          programs = await execExportWin();
          console.log(programs);
          ws.send(JSON.stringify(programs));
        } catch (err) {
          console.error(err);
          return;
        }
      })();
    } else if (operatingSys === 'Mac') {
      (async () => {
        try {
          programs = await execExportMac();
          console.log(programs);
          ws.send(JSON.stringify(programs));
        } catch (err) {
          console.error(err);
          return;
        }
      })();
      ws.send(programs);
    } else if (operatingSys === 'Linux') {
      (async () => {
        try {
          programs = await execExportLin();
          console.log(programs);
          ws.send(JSON.stringify(programs));
        } catch (err) {
          console.error(err);
          return;
        }
      })();
    }
  });
});

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});