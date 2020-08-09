import { app, BrowserWindow, nativeTheme, dialog } from 'electron';

import titleCont from './child/child.constant';

app.allowRendererProcessReuse = true;

try {
  if (
    process.platform === 'win32' &&
    nativeTheme.shouldUseDarkColors === true
  ) {
    require('fs').unlinkSync(
      require('path').join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

/**
 * Set `__` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname;
}

let mainWindow: BrowserWindow | null;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,
      nodeIntegrationInWorker: true

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  });

  mainWindow.loadURL(process.env.APP_URL || '');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

app.on('ready', () => {
  const path = require('path');
  const isDev = require('electron-is-dev');
  let file = 'app.asar/child/index.ts';
  let cwd = path.join(__dirname, '..');

  if (isDev) {
    file = 'index.ts';
    cwd = path.join(__dirname, '../../../Back');
  }
  // dialog.showMessageBox(mainWindow, {
  //   message: path.join(__dirname)
  // });
  const { fork } = require('child_process');
  const child = fork(file, [], {
    cwd,
    shell: true,
    execArgv: ['-r', 'ts-node/register'],
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  child.send({ title: titleCont.ChildProcessIsStarted, data: {} });

  child.on('message', (payloads: { title: string; data: any }) => {
    const title = payloads.title,
      data = payloads.data;
    if (title === titleCont.StartNestServer) {
      createWindow();
      console.log(data.start);
    }
  });

  child.unref();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
