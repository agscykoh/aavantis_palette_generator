const {app,BrowserWindow,ipcMain,clipboard}=require('electron');
const path=require('node:path');
const {generate,normalize}=require('./palette.cjs');
let win;
app.whenReady().then(()=>{
 win=new BrowserWindow({icon:path.join(__dirname,'icon.ico'),width:1200,height:900,minWidth:800,minHeight:600,frame:false,transparent:true,backgroundColor:'#00000000',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
 win.setMenuBarVisibility(false);
 ipcMain.handle('palette:generate',(_event,options)=>generate(options));
 ipcMain.handle('palette:copy',(_event,hex)=>clipboard.writeText(normalize(hex)));
 ipcMain.on('window:action',(_event,action)=>{if(action==='close') win.close(); if(action==='minimize') win.minimize(); if(action==='maximize') win.isMaximized()?win.unmaximize():win.maximize();});
 if(process.argv.includes('--dev')) win.loadURL('http://127.0.0.1:5173'); else win.loadFile(path.join(__dirname,'../dist/index.html'));
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',event=>event.preventDefault());
});
app.on('window-all-closed',()=>app.quit());
