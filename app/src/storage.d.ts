export declare class Storage {
    private sessionStorage;
    private storageIndex;
    constructor(value: string);
    deleteStorageByIndex(callback: {
        (storageItem: string): void;
    }): void;
    getStorageByIndex(callback: {
        (storageItem: string): void;
    }): void;
    nextStorage(): void;
    backStorage(): void;
    getIndex(): number;
    setIndex(index: number): void;
}
//# sourceMappingURL=storage.d.ts.map