import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

import { polling_resources } from './resources-monitor.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({});
    if (isDev()) {
        mainWindow.loadURL('http://localhost:1234');
    } else {
        const app_path = path.join(app.getAppPath(), '/dist-react/index.html');
        mainWindow.loadFile(app_path);
    }

    polling_resources();
});