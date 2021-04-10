import {ipcRenderer} from "electron";

export class Storage {
    private sessionStorage: string;
    private storageIndex: number;

    constructor(value: string) {
        this.sessionStorage = value;
        this.storageIndex = 0;
    }

    public deleteStorageByIndex(callback: {
        (storageItem: string): void
    }): void {
        if (this.storageIndex === 0) {
            this.sessionStorage = "0!0!0!0!0!0&";
            callback(this.sessionStorage);
            return;
        } else {
            ipcRenderer.invoke("deleteStorage", this.storageIndex - 1).then((dataStr) => {
                this.storageIndex--;
                callback(dataStr);
                return;
            });
        }
    }

    public getStorageByIndex(callback: {
        (storageItem: string): void
    }): void {
        if (this.storageIndex === 0) {
            callback(this.sessionStorage);
            return;
        } else {
            ipcRenderer.invoke("getStorage", this.storageIndex - 1).then((dataStr) => {
                console.log(dataStr);
                callback(dataStr);
                return;
            });
            return;
        }
    }

    public nextStorage(): void {
        if (isNaN(this.storageIndex)) {
            this.storageIndex = 0;
        }
        this.storageIndex++;
    }

    public backStorage(): void {
        if (isNaN(this.storageIndex)) {
            this.storageIndex = 0;
        }
        if (this.storageIndex === 0) {
            throw new Error("Cannot go back in the storage");
        } else {
            this.storageIndex--;
        }
    }

    public getIndex(): number {
        return this.storageIndex;
    }

    public setIndex(index: number): void {
        this.storageIndex = index;
    }

}
