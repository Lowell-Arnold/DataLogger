export declare class PageController {
    private readonly pageSize;
    private pageCount;
    private lastPage;
    constructor(pageSize: number);
    pageNext(): void;
    pageBack(): void;
    transformData(data: string[]): string[];
    getPageIndex(): number;
}
//# sourceMappingURL=pageController.d.ts.map