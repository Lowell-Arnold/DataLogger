import { DataObj } from "./dataObj";
import { PageController } from "./pageController";
export declare class ChartElement {
    private readonly element;
    private readonly label;
    private readonly dataPosition;
    private chart;
    private firstBuild;
    constructor(element: HTMLElement | null, label: string, dataPosition: number);
    build(obj: DataObj, controller: PageController): void;
}
//# sourceMappingURL=chartElement.d.ts.map