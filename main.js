// Import electron
const { app, BrowserWindow } = require('electron')
const path = require('path') // https://nodejs.org/api/path.html
const url = require('url') // https://nodejs.org/api/url.html


let win

// Create browser
function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        minWidth: 480,
        minHeight: 360,
        acceptFirstMouse: true,
        // TODO: make frameless after implementing custom dragbar (like firefox)
        frame: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

// Load a URL in the window to the local index.html path
function initURLs() {
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

// Main Process ↓



// Main Process ↑

// Called after process loads
app.whenReady()
    .then(createWindow)
    .then(initURLs)

// Close process if window is closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Init
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})