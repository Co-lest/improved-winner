const tableBody = document.querySelector("#tableBody");

let programs;
let socket;

const connectWebServer = (operatingSystem) => {
  let protocol = "";
  // console.log(window.location.host, "\n", window.location.protocol);
  if (window.location.protocol === "https:") {
    protocol = "ws";
  } else {
    protocol = "wss";
  }

  socket = new WebSocket(`${protocol} //${window.location.host}`);

  socket.addEventListener("open", () => {
    console.log(`Connected to websocket`);
    socket.send(JSON.stringify(operatingSystem));
  });

  socket.addEventListener("message", (mes) => {
    tableBody.innerHTML = "";
      programs = JSON.parse(mes.data);
      if (programs) {
        programs.forEach((element) => {
          const tableRow = document.createElement("tr");
          const tableData = document.createElement("td");
          tableData.setAttribute("id", "tableData");

          tableData.textContent = element;
          tableRow.appendChild(tableData);
          tableBody.appendChild(tableRow);
        });
      } else {
        console.error("Error getting programs!");
        return;
      }
  });

  socket.addEventListener("error", () => {
    console.error(`An error occured when creating a websocket!`);
    return;
  });
}

(function getOs(){
  const plat1 = navigator.platform;

  if (plat1.indexOf("Win") !== -1) {
    connectWebServer("Win");
  } else if (plat1.indexOf("Mac") !== -1) {
    connectWebServer("Mac");
  } else if (plat1.indexOf("Linux") !== -1) {
    connectWebServer("Linux");
  } else if (plat1.indexOf("Android") !== -1) {
    return "Android OS no permissions to remove programs! Sorry";
  } else if (plat1.indexOf("iPhone") !== -1 || plat1.indexOf("iPad") !== -1) {
    return "Android OS no permissions to remove programs! Sorry";
  } else {
    return "Unknown OS";
  }
})();

document.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    if (confirm(`Are you sure you want to delete: ${e.target.textContent}`)) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify( { remove: e.target.textContent } ));
      }
    } else {
      alert(`You have cancelled the deletion of ${e.target.textContent}`);
    }
  }
});