import { DataObj } from "./dataObj";
export declare class ChartElement {
    private readonly element;
    private readonly label;
    private readonly dataPosition;
    private chart;
    constructor(element: HTMLElement | null, label: string, dataPosition: number);
    build(obj: DataObj): void;
}
//# sourceMappingURL=chartElement.d.ts.map