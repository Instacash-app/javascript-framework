export declare class Config {
    private static $configurations;
    static load(configurations: Record<string, any>): Record<string, any>;
    static get(key: string, defaultValue?: any): any;
}
export declare const config: (key: string, defaultValue?: any) => any;
