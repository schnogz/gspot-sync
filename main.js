const { app, BrowserWindow } = require('electron');

// keep reference to window object otherwise it will be
// closed automatically when the JS object is garbage collected.
let mainWindow;

function createWindow () {
  // configure window and load app
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000
  });

  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow);

// quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});