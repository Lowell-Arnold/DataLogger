const crypto = require("./crypto");
const fs = require("fs");
const path = require("path");
const {app} = require("electron");

const storagePath = path.join(app.getPath("userData"), "storage.hash");
console.log(storagePath);

exports.getStorageContent = () => {
  if(fs.existsSync(storagePath) && fs.statSync(storagePath).isFile()) {
    let dataStr = crypto.decode(fs.readFileSync(storagePath, "utf8").replace(/\n/gi,""), "rocket_stats");
    try {
      let dataObj = JSON.parse(dataStr);
      return (typeof dataObj === "object") ? dataObj : [];
    } catch(err) {
      console.error(err);
      return [];
    }
  } else {
    return [];
  }
}

exports.setStorageContent = (storage) => {
  let hash = crypto.encode(JSON.stringify(storage), "rocket_stats");
  fs.writeFileSync(storagePath, hash);
}

exports.addStorageContent = (dataStr) => {
  let storage = exports.getStorageContent();
  storage.push(dataStr);

  let hash = crypto.encode(JSON.stringify(storage), "rocket_stats");
  fs.writeFileSync(storagePath, hash);
}
