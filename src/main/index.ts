import { app, BrowserWindow, screen, Tray, Menu, nativeImage, globalShortcut, ipcMain } from "electron";
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as path from "path";
import * as url from "url";
import makeStore from "src/shared/store";

makeStore(true);

const iconPath = (process.env.NODE_ENV === "development") ?
  'src/shared/assets/icon256.png' :
  path.join(__dirname, 'images/src/shared/assets/icon256.png');

let appIsQuitting = false;
let mainWindow: Electron.BrowserWindow | null;
let quickContactsWindow: Electron.BrowserWindow | null;

const createQuickContactsWindow = () => {
  if (quickContactsWindow) {
    quickContactsWindow.show();
    return;
  }
  quickContactsWindow = new BrowserWindow({
    // x: 0,
    // y: 0,
    width: 600,
    height: 500,
    parent: mainWindow as BrowserWindow,
    title: 'Quick Call',
    show: false,
    resizable: true,
    icon: nativeImage.createFromPath(iconPath),
    skipTaskbar: false,
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false,
      enableRemoteModule: true
    },
  });
  // contactsWindow.removeMenu();
  quickContactsWindow.setMenuBarVisibility(false);
  if (process.env.NODE_ENV === "development") {
    quickContactsWindow.loadURL(`http://localhost:4000/?p=add_quick_contacts`);
    quickContactsWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    quickContactsWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        search: "?p=add_quick_contacts"
        // slashes: true,
      })
    );
  }

  quickContactsWindow.once('ready-to-show', () => {
    quickContactsWindow?.show();
  });

  quickContactsWindow.on("close", ev => {
    if (appIsQuitting) {
      quickContactsWindow = null
    } else {
      ev.preventDefault();
      quickContactsWindow?.hide();
    }
  });

  quickContactsWindow.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });
}
ipcMain.on('open-quick-contacts-window', createQuickContactsWindow);

function createMainWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 100,
    height,
    title: 'Fluxble',
    show: false,
    resizable: false,
    icon: nativeImage.createFromPath(iconPath),
    skipTaskbar: true,
    movable: true,
    // transparent: true,
    frame: false,

    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false,
      enableRemoteModule: true
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on("close", ev => {
    if (appIsQuitting) {
      mainWindow = null
    } else {
      ev.preventDefault();
      mainWindow?.hide();
    }
  });
}

ipcMain.on('open-add-quick-contacts', () => createQuickContactsWindow())

ipcMain.on('resize', (event, arg) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  let w = arg[0], h = arg[1];
  if (w == null) w = win.getSize()[0];
  if (h == null) h = win.getSize()[1];
  win.resizable = true;
  win.setSize(w, h);
  win.resizable = false;
})

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

  createMainWindow();

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
