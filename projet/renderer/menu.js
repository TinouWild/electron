// Modules
const { remote, shell } = require('electron');
const template = [
    {
        label: 'Jeux',
        submenu: [
            {
                label: 'Ajouter un jeu',
                click: window.newItem,
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Enregistrer',
                accelerator: 'CmdOrCtrl+Enter',
                click: window.openItem
            },
            {
                label: 'Supprimer',
                accelerator: 'CmdOrCtrl+BackSpace',
                click: window.deleteItem
            },
            {
                label: 'Ouvrir dans le navigateur',
                accelerator: 'CmdOrCtrl+Shift+O',
                click: window.openItemNative
            },
            {
                label: 'Rechercher',
                accelerator: 'CmdOrCtrl+S',
                click: window.searchItems
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more',
                click: () => { shell.openExternal("https://github.com/TinouWild/electron")}
            }
        ]
    }
];

// MAC Only
if (process.platform === 'darwin') {
    template.unshift({
        label: remote.app.getName(),
        submenu: [
            { role: 'about'},
            { type: 'separator' },
            { role: 'services'},
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    })
}

const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);
