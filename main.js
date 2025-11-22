const { app, BrowserWindow } = require("electron");
const path = require("path");
const http = require("http");

let serverStarted = false;

// Impede múltiplas instâncias
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function waitForServer(url, callback) {
  const check = () => {
    http.get(url, () => {
      console.log("✔ Servidor respondeu");
      callback();
    }).on("error", () => {
      console.log("⏳ Aguardando servidor iniciar...");
      setTimeout(check, 500);
    });
  };
  check();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadURL("http://127.0.0.1:3020");
}

app.whenReady().then(() => {
  process.env.ELECTRON_IS_PACKAGED = app.isPackaged ? "true" : "false";

  if (!serverStarted) {
    serverStarted = true;

    const serverPath = app.isPackaged
      ? path.join(process.resourcesPath, "app", "server", "app.js")   // <-- CORRIGIDO
      : path.join(__dirname, "server", "app.js");

    console.log("Iniciando servidor em:", serverPath);
    require(serverPath);
  }

  waitForServer("http://127.0.0.1:3020", () => {
    console.log("🚀 Servidor online — abrindo janela");
    createWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
