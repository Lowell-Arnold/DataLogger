export class DataObj {
    private readonly data: string[];

    constructor(data: string[]) {
        this.data = data;
    }

    public getObj(): string[] {
        return this.data;
    }

    public getStats(index: number): string[] | false {
        let stats = [];

        if (index > this.data[0].length - 1 || index < 0) {
            console.error("pos is not in length of object");
            return false;
        }

        for (let i = 0; i < this.data.length; i++) {
            stats.push(this.data[i][index]);
        }

        return stats;
    }

    public getLength(): string[] {
        let nums: string[] = [];

        for (let i = 0; i < this.data.length; i++) {
            nums.push((i + 1).toString());
        }

        return nums;
    }
}
