import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { ipc_main_handle, isDev } from './util.js';

import { polling_resources, get_static_data } from './resources-monitor.js';

function get_preload_path(){
    return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs');
}

export function get_ui_path(){
    const app_path = path.join(app.getAppPath(), '/dist-react/index.html');
    return app_path;
}

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            // tell the main window please run the preload script before opening the window
            preload: get_preload_path(),
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:1234');
    } else {
        mainWindow.loadFile(get_ui_path());
    }

    polling_resources(mainWindow);

    ipc_main_handle('getStaticData', () => {
        return get_static_data();
    });
});

