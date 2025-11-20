const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let serverProcess = null;

function criarJanela() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadURL("http://localhost:3010/");
}

app.whenReady().then(() => {

    const serverPath = path.join(__dirname, "server", "app.js");

    console.log("[Electron] Iniciando servidor:", serverPath);

    serverProcess = spawn("node", [serverPath], {
        cwd: process.cwd(),
        shell: true
    });

    serverProcess.stdout.on("data", (data) => {
        console.log("[SERVIDOR]: " + data.toString());
    });

    serverProcess.stderr.on("data", (data) => {
        console.error("[ERRO SERVIDOR]: " + data.toString());
    });

    setTimeout(() => {
        criarJanela();
    }, 800);

});

app.on("window-all-closed", () => {
    if (serverProcess) serverProcess.kill();
    app.quit();
});
