import { BaseService } from './service';
import { Logger, LEVEL } from './Loggers';
import { BaseServiceProvider } from './serviceProvider';
import { Event } from './Events';
import { BindCallback, SingletonCallback } from './cointainer';
import { BaseMiddleware } from './Middleware';
export declare type LoggerConfiguration = {
    type: 'fake' | 'console';
    level?: LEVEL;
};
export declare type ApplicationService = new (app: Application) => BaseService;
export declare type ApplicationServiceProvider = new (app: Application) => BaseServiceProvider;
export declare type ApplicationEvent = new (app: Application) => Event;
export declare type ApplicationMiddleware = new (app: Application) => BaseMiddleware;
declare type ApplicationConfiguration = {
    services: ApplicationService[];
    logger?: LoggerConfiguration;
    serviceProviders?: ApplicationServiceProvider[];
    events?: Record<string, ApplicationEvent>;
    middleware?: Record<string, ApplicationMiddleware>;
};
export declare class Application {
    private $actions;
    private $logger;
    private $eventHandler;
    private $serviceProviders;
    private $serviceContainer;
    private $middleware;
    constructor(configuration: ApplicationConfiguration);
    init(): Promise<void>;
    logger(): Logger;
    call(action: string, request?: any, meta?: any): Promise<any>;
    private preparePipeline;
    private middleware;
    private loadServices;
    emit(event: string, data: any): Promise<void>;
    singleton(id: string, callback: SingletonCallback): void;
    bind(id: string, callback: BindCallback): void;
    get(id: string): any;
    private loadEventHandler;
    private loadServiceProviders;
    private loadService;
    private loadLogger;
    private loadGlobalMiddleware;
    private loadCustomMiddleware;
}
export {};
