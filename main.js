const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    icon: './icon.png',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:8000');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
