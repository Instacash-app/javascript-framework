import { BaseService } from './service';
import { Logger, LEVEL } from './Loggers';
import { BaseServiceProvider } from './serviceProvider';
import { Event } from './Events';
import { BindCallback, SingletonCallback } from './cointainer';
export declare type LoggerConfiguration = {
    type: 'fake' | 'console';
    level?: LEVEL;
};
export declare type ApplicationService = new (app: Application) => BaseService;
export declare type ApplicationServiceProvider = new (app: Application) => BaseServiceProvider;
export declare type ApplicationEvent = new (app: Application) => Event;
declare type ApplicationConfiguration = {
    services: ApplicationService[];
    logger?: LoggerConfiguration;
    serviceProviders?: ApplicationServiceProvider[];
    events?: Record<string, ApplicationEvent>;
};
export declare class Application {
    private $actions;
    private $logger;
    private $eventHandler;
    private $serviceProviders;
    private $serviceContainer;
    constructor(configuration: ApplicationConfiguration);
    init(): Promise<void>;
    logger(): Logger;
    call(action: string, request?: any): Promise<any>;
    private loadServices;
    emit(event: string, data: any): Promise<void>;
    singleton(id: string, callback: SingletonCallback): void;
    bind(id: string, callback: BindCallback): void;
    get(id: string): any;
    private loadEventHandler;
    private loadServiceProviders;
    private loadService;
    private loadLogger;
    private validateRequest;
}
export {};
