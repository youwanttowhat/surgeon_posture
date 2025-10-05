const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
let pyServer;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: { nodeIntegration: false }
  });

  // Start the Voila server
  pyServer = spawn('python', ['-m', 'voila', 'Real-Time_370_Final_Code_053125.ipynb', '--port=8866', '--no-browser']);

  pyServer.stdout.on('data', (data) => {
    console.log(`[Voila]: ${data}`);
  });

  pyServer.stderr.on('data', (data) => {
    console.error(`[Voila Error]: ${data}`);
  });

  // Wait a bit for Voila to start, then open it
  setTimeout(() => {
    win.loadURL('http://localhost:8866');
  }, 4000); // Wait 4s for server startup

  win.on('closed', () => {
    if (pyServer) pyServer.kill();
  });
}

app.whenReady().then(createWindow);
