// Modules
const {app, BrowserWindow} = require('electron');
const windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  // Windows state manager
  let winState = windowStateKeeper({
    defaultWidth: 1000, defaultHeight: 800
  });

  mainWindow = new BrowserWindow({
    width: winState.width, height: winState.height,
    x: winState.x, y: winState.y,
    minWidth: 500, minHeight: 450,
    webPreferences: { nodeIntegration: true }
  });

  //
  // let ses = mainWindow.webContents.session;
  // console.log(ses);

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  // Example with login
  // mainWindow.loadURL('http://httpbin.org/basic-auth/user/passwd');

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  let wc = mainWindow.webContents;

  // Exemple d'authentification sur une URL extérieure
  // wc.on('login', (e, request, authInfo, callback) => {
  //   console.log('Logging in:')
  //   callback('user', 'passwd')
  // })
  //
  // wc.on('did-navigate', (e, url, statusCode, message) => {
  //   console.log(`Navigated to: ${url}, with response code: ${statusCode}`)
  //   console.log(message)
  // });

  // Executer du JS depuis le webContents
  // wc.on('context-menu', (e, params) => {
  //   let selectedText = params.selectionText
  //   wc.executeJavaScript(`alert("${selectedText}")`)
  // });

  winState.manage(mainWindow);
  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  });
}

// Electron `app` is ready
app.on('ready', () => {
  console.log(app.getPath('desktop'));
  console.log(app.getPath('downloads'));
  console.log(app.getPath('documents'));
  console.log(app.getPath('userData'));
  createWindow()
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
});
