const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  sendImage: (data) => {
    require("electron").ipcRenderer.send("set-image", data);
  },
});
