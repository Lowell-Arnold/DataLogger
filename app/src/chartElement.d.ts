import { DataObj } from "./dataObj";
import { PageController } from "./pageController";
export interface IChartColor {
    background: string;
    border: string;
}
export declare class ChartElement {
    private readonly element;
    private readonly label;
    private readonly dataPosition;
    private chart;
    private firstBuild;
    private color;
    constructor(element: HTMLElement | null, label: string, dataPosition: number, color: IChartColor);
    build(obj: DataObj, controller: PageController): void;
}
//# sourceMappingURL=chartElement.d.ts.map