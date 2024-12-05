const par = document.querySelector("#par");

window.addEventListener("load", () => {
    console.log(getOs());
});

const getOs = () => {
    const plat1 = navigator.platform;

    if (plat1.indexOf('Win') !== -1) {
        return 'Windows OS';
    } else if (plat1.indexOf('Mac') !== -1) {
        return 'Mac OS';
    } else if (plat1.indexOf('Linux') !== -1) {
        return 'Linux OS';
    } else if (plat1.indexOf('Android') !== -1) {
        return 'Android OS';
    } else if (plat1.indexOf('iPhone') !== -1 || plat1.indexOf('iPad') !== -1) {
        return 'iOS';
    } else {
        return 'Unknown OS';
    }
}

let protocol;

if (window.location.protocol === "https") {
    protocol = "wss";
} else {
    protocol = "ws";
}

const socket = new WebSocket(`${protocol}://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log(`Connected to websocket`);
});

socket.addEventListener("error", () => {
    console.error(`An error occured when creating a websocket!`);
    return;
});