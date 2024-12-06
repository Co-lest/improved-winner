import { execExportWin } from "../Utils/win32.js";
import { execExportMac } from "../Utils/mac.js";
import { execExportLin } from "../Utils/linux.js";

const par = document.querySelector("#par");

window.addEventListener("load", () => {
  getOs();
  connectWebServer();
});

let programs;

const getOs = () => {
  const plat1 = navigator.platform;

  if (plat1.indexOf("Win") !== -1) {
    programs = execExportWin();
    if (programs) {
      console.log(programs);
      par.textContent = programs;
    } else {
      console.log(`Unaniona matako yako!`);
    }
  } else if (plat1.indexOf("Mac") !== -1) {
    programs = execExportMac();
    par.textContent = programs;
  } else if (plat1.indexOf("Linux") !== -1) {
    programs = execExportLin();
    par.textContent = programs;
  } else if (plat1.indexOf("Android") !== -1) {
    return "Android OS no permissions to remove programs! Sorry";
  } else if (plat1.indexOf("iPhone") !== -1 || plat1.indexOf("iPad") !== -1) {
    return "Android OS no permissions to remove programs! Sorry";
  } else {
    return "Unknown OS";
  }
};

const connectWebServer = () => {
  let protocol = "";
  if (window.location.protocol === "https:") {
    protocol = "ws";
  } else {
    protocol = "wss";
  }

  const socket = new WebSocket(`${protocol} //${window.location.host}`);

  socket.addEventListener("open", () => {
    console.log(`Connected to websocket`);
  });

  socket.addEventListener("error", () => {
    console.error(`An error occured when creating a websocket!`);
    return;
  });
};
