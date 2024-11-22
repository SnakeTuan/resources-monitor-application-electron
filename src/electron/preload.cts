const electron = require('electron');

// contextBridege can be used to bridge data between the main and renderer processes
electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStats: (callback: (stats: any) => void) => callback({}),
    getStats: () => console.log('static'),
})