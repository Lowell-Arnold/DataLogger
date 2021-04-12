import {DataObj} from "./dataObj";

export class DataString {
    public build(dataStr: string): DataObj {
        let obj: any = [];
        let rows: string[] = dataStr.split("&");
        for (let i: number = 0; i < rows.length - 1; i++) {
            obj.push([]);
            let columns: string[] = rows[i].split("!");
            for (let k: number = 0; k < columns.length; k++) {
                obj[i].push(columns[k]);
            }
        }

        return new DataObj(obj);
    }
}
