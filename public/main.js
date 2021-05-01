const { app, BrowserWindow } = require('electron')
const nativeImage = require('electron').nativeImage
const path = require('path')


function createWindow () {
  const iconPath = __dirname + '/logo512.png';

  const icon = nativeImage.createFromPath(iconPath);
  icon.setTemplateImage(true);
  
  const win = new BrowserWindow({
    width: 1280,
    height: 960,
    transparent: true,
    icon: icon,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.NODE_ENV == "development") {
    const SERVER_URL = encodeURIComponent("http://localhost:3000/")
    win.loadURL(`file://${path.join(__dirname, `../dev.html?SERVER_URL=${SERVER_URL}`)}`)
  }
  else {
    win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
