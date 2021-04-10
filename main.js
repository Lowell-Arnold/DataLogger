const {
  BrowserWindow,
  app,
  ipcMain,
  dialog
} = require("electron");
const fs = require("fs");
const path = require("path");
const util = require('util');
const storage = require("./storage");

async function isDataFileFormat(dataStr) {
  try {
    let rows = dataStr.split("&");
    let contentLenght;
    if (rows.length === 1) {
      return false;
    }

    for (let i = 0; i < rows.length - 1; i++) {
      let columns = rows[i].split("!");
      if (i === 0) {
        contentLenght = columns.length;
      } else if (contentLenght !== columns.length) {
        return false;
      }
      for (let k = 0; k < columns.length; k++) {
        let number = columns[k];

        if (number.search(",") === -1) { // if -1 then is int;
          if (isNaN(parseInt(number))) {
            return false;
          }
        } else { // is float
          number = number.replace(/,/gi, ".");
          if (isNaN(parseFloat(number))) {
            return false;
          }
        }

      }
    }
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
}

app.on("ready", () => {
  let win = new BrowserWindow({
    width:1200,
    heigth: 700,
    minWidth: 585,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  win.setMenu(null);
  win.loadFile(path.join(__dirname, "app", "index.html")).then(() => {
    win.webContents.openDevTools({
      mode: "undocked"
    });
  });

  win.on("closed", () => {
    app.quit();
  });

  ipcMain.handle('getDataObj', async (event, args) => {

    const readFile = util.promisify(fs.readFile);
    const filePath = await dialog.showOpenDialog(win, {
      properties: ["openFile"]
    });
    if (!filePath || filePath.length === 0) {
      return false;
    }
    let dataStr = await readFile(filePath.filePaths[0]);
    dataStr = dataStr.toString();
    if (await isDataFileFormat(dataStr)) {
      if (dialog.showMessageBoxSync({
        message: "Do you want to add this data-file to the program storage",
        type: "question",
        buttons: ["Yes", "No"],
        title: "Add storage content?"
      }) === 0) {
        storage.addStorageContent(dataStr);
      }
      return dataStr;
    } else {
      return false;
    }
  });

  ipcMain.on("formatError",() => {
      dialog.showErrorBox("Format Error", "The selected file has not the right formating type");
  });

  ipcMain.handle("getStorage", async (event, args) => {
      let storageObj = storage.getStorageContent();
      if (args < storageObj.length) {
        return storageObj[args];
      } else {
        dialog.showErrorBox("ID out of range", "Error Error her must be a error message"); // TODO write erro message
        return "0!0!0!0!0!0&";
      }
  });

  ipcMain.handle("deleteStorage", async (event, args) => {
    let newActiveStorage ="";
    let storageObj = storage.getStorageContent();
    if (args < storageObj.length) {
      dialog.showErrorBox("ID out of range", "Error Error her must be a error message"); // TODO write erro message
      return "0!0!0!0!0!0&";
    } else {
      let newStorageObj = [];

      for (let i = 0; i < storageObj.length; i++) {
        if (i === args -1) {
          newActiveStorage = storageObj[i];
        }

        if (i === args) {
          continue;
        } else {
          newStorageObj.push(storageObj[i]);
        }
      }

      storage.setStorageContent(newStorageObj);
      return newActiveStorage;
    }
  });
});
