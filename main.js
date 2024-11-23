// https://www.youtube.com/watch?v=kBtYon8KmdU&list=PLe30vg_FG4OSKH_8zpLlnf4WpNlzL526E&index=3
const {app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = ()=>{
    const win = new BrowserWindow({
        height:600,
        width:800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
    })
    win.loadFile('index.html');
}

app.whenReady().then(()=>{
    createWindow();
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })