const {app, BrowserWindow, ipcMain} = require('electron');
const windowStateKeeper = require('electron-window-state');
const readItem = require('./readItem');
const electron = require('electron');
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow;

ipcMain.on('new-item', (e, itemUrl) => {
  readItem(itemUrl, item => {
    e.sender.send('new-item-success', item)
  })
});

function createWindow () {
  // Win state keeper
  let state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650
  });

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    minWidth: 350, maxWidth: 650, minHeight: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('renderer/main.html');

  state.manage(mainWindow);

  mainWindow.on('closed',  () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', () => {
  if (mainWindow === null) createWindow()
});
