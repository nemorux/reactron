import {app, BrowserWindow, screen, Tray, Menu, nativeImage, globalShortcut} from "electron";
import installExtension, {REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';
import * as path from "path";
import * as url from "url";
import makeStore from "src/shared/store";

makeStore(true);

const iconPath = 'src/shared/assets/icon256.png';
let appIsQuitting = false;
let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  const {height} = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 0,
    height,
    resizable: false,
    icon: nativeImage.createFromPath(iconPath),
    skipTaskbar: true,
    // transparent: true,
    frame: false,

    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools({mode: 'detach'});
    // let extPath = '/home/mmd/.config/google-chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0/';
    // mainWindow.webContents.session.loadExtension(extPath).then(({id}) => {
    //   console.log('EXTENSION LOADED', id);
    // });
    // extPath = '/home/mmd/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.1_0/';
    // mainWindow.webContents.session.loadExtension(extPath).then(({id}) => {
    //   console.log('EXTENSION LOADED', id);
    // });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }


  mainWindow.on("close", ev => {
    if (appIsQuitting) {
      mainWindow = null
    } else {
      ev.preventDefault();
      mainWindow?.hide();
    }
  });
}

app.on('before-quit', () => {
  appIsQuitting = true;
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  mainWindow?.show()
});

let tray;
app.on("ready", () => {
  // mainStore.subscribe(async () => {
  //   // global.state = mainStore.getState();
  // });

  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('ERROR INSTALLING EXTENSION: ', err));

  createWindow();

  const ret = globalShortcut.register('Ctrl+Super+A', () =>
      mainWindow?.show()
    // mainWindow?.isVisible() ?
    //   (mainWindow?.isFocused() ? mainWindow?.hide() : mainWindow?.focus()) :
    //   mainWindow?.show()
  );
  if (!ret) {
    console.log('Ctrl+Super+A registration failed');
  }


  tray = new Tray((nativeImage.createFromPath(iconPath)));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: () => {
        mainWindow?.show();
      }
    },
    {
      label: 'Hide', click: () => {
        mainWindow?.hide();
      }
    },
    {
      label: 'Exit', click: () => {
        app.exit(0);
        // app.quit();
      }
    }
  ])
  tray.setToolTip('Reactron');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow?.show()
  });
});

app.allowRendererProcessReuse = true;
