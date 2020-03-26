// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remote = require('electron').remote;
const { dialog, BrowserWindow } = remote;

const button = document.getElementById('test-button');

button.addEventListener('click', e => {
   dialog.showMessageBox({message: 'Dialog invoked from Renderer process'})

    let secWin = new BrowserWindow({
        width: 480, height: 350
    });
    secWin.loadFile('index.html')

    console.log(remote.getGlobal('myglob'));
});

// IPC MAIN RENDERER
const { ipcRenderer } = require('electron')
document.getElementById('talk').addEventListener('click', e => {
    ipcRenderer.send('channel1', 'Hello from main Window');
    let response = ipcRenderer.sendSync('sync-message', 'Waiting for response');
    console.log(response);
});

ipcRenderer.on('channel1-response', (e, args) => {
    console.log(args);
});
ipcRenderer.on('mailbox', (e, args) => {
    console.log(args);
});

// PROGRESS BAR
const self = remote.getCurrentWindow();
let progress = 0.01;
let progressInterval = setInterval(() => {
   self.setProgressBar(progress);
   if (progress <= 1) {
       progress += 0.1;
   } else {
       self.setProgressBar(-1);
       clearInterval(progressInterval);
   }
}, 75);

