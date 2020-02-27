// Modules
const {app, BrowserWindow, session, dialog} = require('electron');
const windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  // Windows state manager
  // let winState = windowStateKeeper({
  //   defaultWidth: 1000, defaultHeight: 800
  // });

  let ses = session.defaultSession;

  mainWindow = new BrowserWindow({
    width: 1000, height: 600,
    minWidth: 500, minHeight: 450,
    webPreferences: { nodeIntegration: true }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');

  // Example with login
  // mainWindow.loadURL('http://httpbin.org/basic-auth/user/passwd');

  // Open DevTools - Remove for PRODUCTION!
  mainWindow.webContents.openDevTools();

  // Download Item
  // ses.on('will-download', (e, downloadItem, webContents) => {
  //   let filename = downloadItem.getFilename();
  //   let filesize = downloadItem.getTotalBytes();
  //
  //   downloadItem.setSavePath(app.getPath('documents') + `/${filename}`);
  //
  //   downloadItem.on('updated', (e, state) => {
  //     let received = downloadItem.getReceivedBytes();
  //
  //     if (state === 'progressing' && received) {
  //       let progress = Math.round((received/filesize)*100);
  //       webContents.executeJavaScript(`window.progress.value = ${progress}`)
  //     }
  //   });
  // });

  // Dialog options (openDialog + messageBox)
  // mainWindow.webContents.on('did-finish-load', () => {
  //   dialog.showOpenDialog(mainWindow, {
  //     buttonLabel: 'Select a photo',
  //     defaultPath: app.getPath('documents'),
  //     properties: ['multiSelections', 'createDirectory', 'openFile']
  //   }, filePaths => {
  //     console.log(filePaths)
  //   });
  //   const answers = ['Yes', 'No', 'Maybe'];
  //
  //   dialog.showMessageBox(mainWindow, {
  //     title: "Message Box",
  //     message: "Please select an option",
  //     detail: "Message details",
  //     buttons: answers
  //   }, response => {
  //     console.log(`User selected : ${answers[response]}`)
  //   })
  // });

  // let wc = mainWindow.webContents;
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

  // winState.manage(mainWindow);
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
