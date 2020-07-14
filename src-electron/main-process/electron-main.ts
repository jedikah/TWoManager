import { app, BrowserWindow, nativeTheme } from 'electron';

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
  const pathStore = store.get('path') || null;
  // store.delete('pathStore');
  // store.delete('register');
  // store.delete('pdp');
  // store.delete('path');
  console.log({ pathStore });
  (async () => {
    if (pathStore) {
      console.log(pathStore);
      global.db = await dataBase(pathStore); //connection à la base de donnée quand path exist

      const register = store.get('register') || null;
      const pdp = store.get('pdp') || null;
      console.log('register = ', register);
      if (register !== 'finished') {
        //enregistre l'utilisateur du premier demerrege dans le DB
        console.log('********: bla');
        const name: string = register.name,
          login: string = register.login,
          password: string = register.password;

        const user = global.db.user.asRxCollection;

        const res = await user.createUser(
          {
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
