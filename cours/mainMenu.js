module.exports = [
    {
        label: 'Electron',
        submenu: [
            {label: 'Item1'},
            {label: 'Item2', submenu: [
                    {label: 'Item1'},
                    {label: 'Item2'},
                ]},
            {label: 'Item3'},
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {role: 'copy'},
            {role: 'paste'},
        ]
    },
    {
        label: 'Actions',
        submenu: [
            {
                label: 'Dev Tools',
                role: 'toggleDevTools',
            },
            {
                role: 'toggleFullScreen'
            },
            {label: 'Action 3'},
        ]
    }
];
