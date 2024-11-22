const electron = require('electron');

// contextBridege can be used to bridge data between the main and renderer processes
electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStats: (callback: (stats: any) => void) => {
        electron.ipcRenderer.on('resource-usage', (_, stats) => {
            callback(stats);
        });
    },
    getStats: () => {
        return electron.ipcRenderer.invoke('get-stats');
    },
})