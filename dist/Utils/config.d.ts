export declare class Config {
    private static $folderPath;
    private static $configurations;
    static configurePath(path: string): string;
    static get(key: string, defaultValue?: any): any;
    private static loadFile;
    private static existsFile;
}
export default function config(key: string, defaultValue?: any): any;
