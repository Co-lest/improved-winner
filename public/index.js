import { execExportWin } from "../utils/win32.js";
import { execExportMac } from "../utils/mac.js";
import { execExportLin } from "../utils/linux.js";

const par = document.querySelector("#par");
const uninstallContainer = document.querySelector("#uninstall-container");

let programs;

(function getOs(){
  const plat1 = navigator.platform;

  if (plat1.indexOf("Win") !== -1) {
    programs = execExportWin();
    connectWebServer();
    if (programs) {
      console.log(programs);
      par.textContent = programs;
      uninstallContainer.style.display = "block";
    } else {
      console.log(`Unaniona matako yako!`);
    }
  } else if (plat1.indexOf("Mac") !== -1) {
    programs = execExportMac();
    par.textContent = programs;
    uninstallContainer.style.display = "block";
    connectWebServer();
  } else if (plat1.indexOf("Linux") !== -1) {
    programs = execExportLin();
    par.textContent = programs;
    uninstallContainer.style.display = "block";
    connectWebServer();
  } else if (plat1.indexOf("Android") !== -1) {
    return "Android OS no permissions to remove programs! Sorry";
  } else if (plat1.indexOf("iPhone") !== -1 || plat1.indexOf("iPad") !== -1) {
    return "Android OS no permissions to remove programs! Sorry";
  } else {
    return "Unknown OS";
  }
})();

const connectWebServer = () => {
  let protocol = "";
  console.log(window.location.host, "\n", window.location.protocol);
  if (window.location.protocol === "https:") {
    protocol = "ws";
  } else {
    protocol = "wss";
  }

  const socket = new WebSocket(`${protocol} //${window.location.host}`);

  socket.addEventListener("open", () => {
    console.log(`Connected to websocket`);
    socket.send("Connected to the websocket!");
  });

  socket.addEventListener("error", () => {
    console.error(`An error occured when creating a websocket!`);
    return;
  });
};