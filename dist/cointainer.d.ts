export declare type SingletonCallback = () => any;
export declare type BindCallback = (data: any) => any;
export declare class ServiceContainer {
    private $data;
    singleton(id: string, callback: SingletonCallback): void;
    bind(id: string, callback: BindCallback): void;
    get(id: string): any;
    private info;
    private register;
}
