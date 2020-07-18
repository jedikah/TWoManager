import { app, BrowserWindow, nativeTheme } from 'electron';

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
  const file = 'index.ts';

  const { fork } = require('child_process');
  const child = fork(file, [], {
    cwd: path.join(__dirname, '/child'),
    shell: true,
    execArgv: ['-r', 'ts-node/register'],
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  child.send({ title: titleCont.Child_process_is_started, data: {} });

  child.on('message', (payloads: { title: string; data: any }) => {
    const title = payloads.title,
      data = payloads.data;
    if (title === titleCont.start_nest_server) console.log(data.start);
  });

  child.unref();

  createWindow();
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
