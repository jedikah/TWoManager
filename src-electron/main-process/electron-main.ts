import { app, BrowserWindow, nativeTheme, dialog } from 'electron';

import dataBase from '../dataBase';

const Store = require('electron-store');
const store = new Store();

global.db;

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
  global.__ = require('path')
    .join(__dirname, '')
    .replace(/\\/g, '\\\\');
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
  const pathStore = store.get('path') || null;
  // store.delete('pathStore');
  // store.delete('register');
  // store.delete('pdp');
  (async () => {
    if (pathStore) {
      global.db = await dataBase(pathStore); //connection à la base de donnée quand path exist

      const register = store.get('register') || null;
      const pdp = store.get('pdp') || null;
      console.log('register = ', register);
      if (typeof register === typeof Object()) {
        //enregistre l'utilisateur du premier demerrege dans le DB
        console.log('********: ');
        const IdUser = '1',
          name: string = register.name,
          login: string = register.login,
          password: string = register.password;

        const user = global.db.user.asRxCollection;

        const res = await user.createUser(
          {
            IdUser,
            name,
            login,
            password
          },
          pdp
        );
        console.log('in .method.ts : res = ', res);
        store.set('register', 'finished'); //supprimer
        if (pdp) store.delete('pdp'); //supprimer apres enregistrement
        console.log('save ok');
      }
    }

    const path = require('path');
    const isDev = require('electron-is-dev');
    let file = 'fofifa.asar/index.js';

    if (isDev) file = 'fofifa';

    const { fork } = require('child_process');
    const forked = fork(file, [], {
      cwd: path.join(__dirname, '../backend'),
      shell: true,
      stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    forked.send({ port: 4000 });
    forked.on('message', ({ message }) => console.log(message));
    forked.unref();

    createWindow();
  })();
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
