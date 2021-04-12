export class PageController {
    private readonly pageSize: number;
    private pageCount: number;
    private lastPage: boolean;

    constructor(pageSize: number) {
        this.pageSize = pageSize;
        this.pageCount = 0;
        this.lastPage = false;
    }

    public pageNext(): void {
        if (!this.lastPage) {
            this.pageCount++;
        }
    }

    public pageBack(): void {
        if (this.pageCount !== 0) {
            this.pageCount--;
        }
    }

    public transformData(data: string[]): string[] {
        this.lastPage = false;
        let start: number = this.pageCount * this.pageSize;
        let newData = [];
        for (let i: number = start; i < start + this.pageSize; i++) {
            if (data[i] === undefined) {
                this.lastPage = true;
                break;
            }
            newData.push(data[i]);
        }

        return newData;
    }

    public getPageIndex(): number {
        return this.pageCount;
    }

}
