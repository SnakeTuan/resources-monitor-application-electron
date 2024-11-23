import { ipcMain, WebContents, webContents, WebFrameMain } from 'electron';
import { pathToFileURL } from 'url';
import { get_ui_path } from './main.js';

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function ipc_main_handle <key extends keyof EvenPayloadMapping> (
  key: key, 
  handler: () => EvenPayloadMapping[key],
) {
  ipcMain.handle(key, (event) => {
    if (event.senderFrame) {
      validate_event_frame(event.senderFrame);
    }
    return handler();
  });
}

export function ipc_web_contents_send <key extends keyof EvenPayloadMapping>(
  key: key,
  webContents: WebContents,
  payload: EvenPayloadMapping[key],
){
  webContents.send(key, payload);
}

export function validate_event_frame(frame: WebFrameMain){
  console.log(frame.url);
  if(isDev() && new URL(frame.url).host === 'localhost:1234'){
    return;
  }
  if(frame.url !== pathToFileURL(get_ui_path()).toString()){
    throw new Error('suspecious event');
  }
}

