export declare class Env {
    static get(key: string, defaultValue?: any): any;
    private static parse;
}
export declare const env: (key: string, defaultValue?: any) => any;
