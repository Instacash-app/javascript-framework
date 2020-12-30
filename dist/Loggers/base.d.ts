import { Application } from '../application';
export declare type LEVEL = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'all';
export interface Logger {
    fatal(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    trace(...args: any[]): void;
}
export declare abstract class BaseLogger implements Logger {
    protected $app: Application;
    protected $level: LEVEL;
    constructor($app: Application, $level: LEVEL);
    abstract fatal(...args: any[]): void;
    abstract error(...args: any[]): void;
    abstract warn(...args: any[]): void;
    abstract info(...args: any[]): void;
    abstract debug(...args: any[]): void;
    abstract trace(...args: any[]): void;
}
