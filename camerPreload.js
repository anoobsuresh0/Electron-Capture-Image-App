const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  sendImage: (data) => {
    require("electron").ipcRenderer.send("get-image", data);
  },
});
