
// Youtube Video : https://youtu.be/kBtYon8KmdU?si=qX6fqVWpSdoPgyNh

// Check the Awesome Electron Repo for more electron resources: https://github.com/sindresorhus/awesome-electron

const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("path");

const menuItems = [
  {
    label: app.name,
    submenu: [
      {
        label: "About",
        click: () => {
          console.log("About clicked");
        },
      },
      { type: "separator" },
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Open Camera",
        click: async () => {
          //Window 2
          const win2 = new BrowserWindow({
            show: false,
            // backgroundColor: "#2e2c29",
            height: 600,
            width: 800,
            webPreferences: {
              preload: path.join(__dirname, "camerPreload.js"),
            },
            // movable: false,
          });
          // win2.webContents.openDevTools();
          win2.loadFile("camera.html");
          // win2.loadURL("https://www.google.com")
          win2.once("ready-to-show", () => win2.show());

          ipcMain.on("close-window2", () => {
            win2.close();
          });
        },
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
      { type: "separator" },
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://www.electronjs.org/");
        },
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      {
        role: "close",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

// Window 1
const createWindow = () => {
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("get-image", (event, data) => {
    win.webContents.send("send-image", data);
  });

  win.loadFile("index.html");
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});







