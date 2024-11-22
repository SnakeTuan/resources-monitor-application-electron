import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

import { polling_resources } from './resources-monitor.js';

function get_preload_path(){
    return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs');
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
        const app_path = path.join(app.getAppPath(), '/dist-react/index.html');
        mainWindow.loadFile(app_path);
    }

    polling_resources();
});