import { ipcMain, WebContents, webContents } from 'electron';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function ipc_main_handle <key extends keyof EvenPayloadMapping> (
  key: key, 
  handler: () => EvenPayloadMapping[key],
) {
  ipcMain.handle(key, () => handler());
}

export function ipc_web_contents_send <key extends keyof EvenPayloadMapping>(
  key: key,
  webContents: WebContents,
  payload: EvenPayloadMapping[key],
){
  webContents.send(key, payload);
}