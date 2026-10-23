const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('paletteApp',{generate:options=>ipcRenderer.invoke('palette:generate',options),copy:hex=>ipcRenderer.invoke('palette:copy',hex),window:action=>ipcRenderer.send('window:action',action)});
