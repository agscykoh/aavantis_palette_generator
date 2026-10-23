const {app,BrowserWindow}=require('electron');
const fs=require('node:fs');
require('../electron/main.cjs');
const timeout=setTimeout(()=>{console.error('Smoke test timed out');app.exit(1);},30000);
app.whenReady().then(()=>{
 const win=BrowserWindow.getAllWindows()[0];
 win.webContents.once('did-finish-load',async()=>{
  try{
   await win.webContents.executeJavaScript('document.fonts.ready');
   await new Promise(r=>setTimeout(r,500));
   fs.mkdirSync('previews',{recursive:true});
   fs.writeFileSync('previews/landing.png',(await win.webContents.capturePage()).toPNG());
   await win.webContents.executeJavaScript(`document.querySelector('[aria-label="Generate three-colour palette"]').click()`);
   for(let i=0;i<50;i++){
    const done=await win.webContents.executeJavaScript(`Boolean(document.querySelector('.hex-output'))`);
    if(done)break;
    await new Promise(r=>setTimeout(r,100));
   }
   const result=await win.webContents.executeJavaScript(`(async()=>{
    const outputs=[...document.querySelectorAll('.hex-output')].map(x=>x.textContent);
    if(outputs.length!==3||outputs[0]!=='#534d9e')throw Error('Missing generated palette');
    document.querySelector('[aria-label="Lock base"]').click();
    await new Promise(r=>setTimeout(r,50));
    if(!document.querySelector('[aria-label="Unlock base"]'))throw Error('Lock failed');
    document.querySelector('[aria-label="Unlock base"]').click();
    document.querySelector('.hex-output').click();
    await new Promise(r=>setTimeout(r,100));
    if(!document.querySelector('[role="status"]').textContent.includes('copied'))throw Error('Copy failed');
    return outputs;
   })()`);
   fs.writeFileSync('previews/results.png',(await win.webContents.capturePage()).toPNG());
   console.log('Electron smoke test passed:',result);clearTimeout(timeout);app.exit(0);
  }catch(error){console.error(error);clearTimeout(timeout);app.exit(1);}
 });
});
