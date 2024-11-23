const electron = require('electron');

// contextBridege can be used to bridge data between the main and renderer processes
electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStats: (callback: (stats: any) => void) => {
        ipc_on('getStatistic', (stats) => {
            callback(stats);
        });
    },
    getStats: () => {
        return ipc_invoke('getStaticData');
    },
} satisfies Window['electron'] );

function ipc_invoke <key extends keyof EvenPayloadMapping> (
    key: key,
) {
    return electron.ipcRenderer.invoke(key);
}

function ipc_on <key extends keyof EvenPayloadMapping> (
    key: key,
    callback: (payload: EvenPayloadMapping[key]) => void,
) {
    electron.ipcRenderer.on(key, (_, payload) => {
        callback(payload);
    });
}