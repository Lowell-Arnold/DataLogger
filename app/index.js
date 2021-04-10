const {
  ipcRenderer
} = require("electron");

const storage = {
  __init__(session_storage) {
    this.__session_storage = session_storage;
    this.__storage_id = 0;
  },

  deleteStorageByInt(callback) {
    if (this.__storage_id === 0) {
      this.__session_storage ="0!0!0!0!0!0&";
      callback(this.__session_storage);
      return;
    } else {
      ipcRenderer.invoke("deleteStorage", this.__storage_id -1).then((dataStr) => {
        this.__storage_id = this.__storage_id - 1;
        callback(dataStr);
        return;
      });
    }
  },

  getStorageByInt(callback) {
    if (this.__storage_id === 0) {
      callback(this.__session_storage);
      return;
    } else {
      ipcRenderer.invoke("getStorage", this.__storage_id - 1).then((dataStr) => {
        console.log(dataStr);
        if (dataStr === "0!0!0!0!0!0&") {
          this.__storage_id--;
        }
        callback(dataStr);
        return;
      });
      return;
    }
  },

  nextStorage() {
    if (isNaN(this.__storage_id)) {
      this.__storage_id = 0;
    }
    console.log(this.__storage_id);
    this.__storage_id = this.__storage_id + 1;
    console.log(this.__storage_id);
  },

  backStorage() {
    if (isNaN(this.__storage_id)) {
      this.__storage_id = 0;
    }
    if (this.__storage_id === 0) {
      throw new Error("Cannot go back in the storage");
    } else {
      console.log(this.__storage_id);
      this.__storage_id = this.__storage_id - 1;
      console.log(this.__storage_id);
    }
  }
}

function buildDataObj(input) {
  let obj = [];
  let rows = input.split("&");
  for (let i = 0; i < rows.length - 1; i++) {
    obj.push([]);
    let columns = rows[i].split("!");
    for (let k = 0; k < columns.length - 1; k++) {
      obj[i].push(columns[k]);
    }
  }

  return obj;
}

function getStatsOfObj(pos, obj) {
  let stats = [];

  if (pos > obj[0].length - 1 || pos < 0) {
    console.error("pos is not in length of object");
    return false;
  }

  for (let i = 0; i < obj.length; i++) {
    stats.push(obj[i][pos]);
  }


  return stats;

}

function getScanLength(obj) {
  let nums = [];

  for (let i = 0; i < obj.length; i++) {
    nums.push((i + 1).toString());
  }

  return nums;
}

function updateChart(element, dataObj, labelname, dataPosition) {
  if (element === null) {
    throw new Error("Element equals null");
  } else {
    new Chart(element, {
      type: "line",
      data: {
        labels: getScanLength(dataObj),
        datasets: [{
          label: labelname,
          backgroundColor: 'rgba(255,0,0,0.4)',
          borderColor: 'rgba(255,0,0,1)',
          data: getStatsOfObj(dataPosition, dataObj)
        }]
      }
    });
  }
}

function updateAllCharts(dataObj) {
  updateChart(document.getElementById("tempStat"), dataObj, "Temperatur", 3);
}

window.addEventListener("load", () => {
  let dataObj = buildDataObj("0!0!0!0!0!0&");
  storage.__init__("0!0!0!0!0!0&");
  window.addEventListener("scroll", function() {
    if (this.scrollY > 0) {
      document.getElementsByClassName("header")[0].style.position = "fixed";
      document.getElementsByClassName("header")[0].style.width = "100%";
      document.getElementsByClassName("header")[0].style.backgroundColor = "#e0e0e0";

    } else {
      document.getElementsByClassName("header")[0].style.position = "";
      document.getElementsByClassName("header")[0].style.with = "";
      document.getElementsByClassName("header")[0].style.backgroundColor = "";
    }

  });

  document.getElementById('buttonDataLog').addEventListener("click", async () => {
    const dataStr = await ipcRenderer.invoke('getDataObj', "");
    if (dataStr === false) {
      ipcRenderer.send("formatError", "");
      return;
    } else {
      storage.__init__(dataStr);
      dataObj = buildDataObj(dataStr);
      console.log(dataObj);
      console.log(getStatsOfObj(0, dataObj));
      updateAllCharts(dataObj);
    }
  });

  document.getElementById("storageBack").addEventListener("click", () => {
    storage.backStorage();
    storage.getStorageByInt((dataStr) => {
      dataObj = buildDataObj(dataStr);
      updateAllCharts(dataObj);
    });
    document.getElementById("storageCount").value = storage.__storage_id.toString();
  });

  document.getElementById("storageCount").addEventListener("change",function() {
    storage.__storage_id = parseInt(this.value);
    storage.getStorageByInt((dataStr) => {
      dataObj = buildDataObj(dataStr);
      updateAllCharts(dataObj);
    });
    document.getElementById("storageCount").value = storage.__storage_id.toString();
  });

  document.getElementById("storageNext").addEventListener("click", () => {
    storage.nextStorage();
    storage.getStorageByInt((dataStr) => {
      dataObj = buildDataObj(dataStr);
      updateAllCharts(dataObj);
    });
    document.getElementById("storageCount").value = storage.__storage_id.toString();
  });

  document.getElementById("clearStorage").addEventListener("click", () => {
    storage.deleteStorageByInt((dataStr) => {
      dataObj = buildDataObj(dataStr);
      updateAllCharts(dataObj);
    });
    document.getElementById("storageCount").value = storage.__storage_id.toString();
  });

  updateAllCharts(dataObj);

});
