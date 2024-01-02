const { error } = require('console')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
require('electron-reload')(__dirname)


let mainWindow

const createWindow = () => {
   mainWindow = new BrowserWindow({
     width: 800,
     height: 600,
     webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
     }
   })
 
   mainWindow.loadFile('index.html')
 }

 app.whenReady().then(() => {
   createWindow()
 })

async function calcolaSomma(numero1, numero2){
   let result;
   await fetch('http://127.0.0.1:5000/server', {
      method: "POST",
      headers: {
          'Content-Type':"application/json"
      },
      body: JSON.stringify({"x": numero1, "y": numero2})
   })
   .then(response => response.json())
   .then((data) => {
      result = data.somma;
   })
   .catch(error => console.log(error))
   
   return result;
}

ipcMain.handle('somma', async (event, data) => {
   let result;
   console.log(data.x + " " + data.y)
   result = await calcolaSomma(data.x, data.y)
   console.log("Ricevo=" + result)
   return result
})

ipcMain.on('test', (event, data) => {
   console.log("AHHH SONO VENUTO");
   fetch('http://127.0.0.1:5000/test' , {
      method: "GET",
      headers: {
         'Content-Type':"application/json"
     }
   })
   .then(response => response.json())
   .then(data => {
      console.log(data);
      event.reply('risultato', data);
   })
   .catch(error => console.log(error))
})