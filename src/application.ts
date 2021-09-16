import {
  BaseService,
  Action,
} from './service';
import {
  FakeLogger,
  ConsoleLogger,
  Logger,
  LEVEL
} from './Loggers'
import {isFunction} from './Utils';
import {BaseServiceProvider} from './serviceProvider';
import {Request, RequestAttributes} from './request';
import {BaseError, NotFoundError} from './Errors';
import {Event, EventHandler, EventHandlerContract} from './Events';
import {BindCallback, ServiceContainer, SingletonCallback} from './cointainer';
import {BaseMiddleware, ValidationMiddleware} from './Middleware';
import {MiddlewareHandler, NextCallback, Pipeline} from './pipeline';

export type LoggerConfiguration = {
  type: 'fake' | 'console',
  level?: LEVEL
};
export type ApplicationService = new (app: Application) => BaseService;
export type ApplicationEventHandler = new () => EventHandlerContract;
export type ApplicationServiceProvider = new (app: Application) => BaseServiceProvider;
export type ApplicationEvent = new (app: Application) => Event;
export type ApplicationMiddleware = new (app: Application) => BaseMiddleware;

type ApplicationConfiguration = {
  services: ApplicationService[];
  logger?: LoggerConfiguration;
  serviceProviders?: ApplicationServiceProvider[];
  eventHandler?: ApplicationEventHandler;
  events?: Record<string, ApplicationEvent>;
  middleware?: Record<string, ApplicationMiddleware>;
};

export class Application {
  private $actions: Record<string, Action> = {}
  private $logger: Logger;
  private $eventHandler: EventHandlerContract;
  private $serviceProviders: BaseServiceProvider[] = [];
  private $serviceContainer: ServiceContainer;
  private $middleware: Record<string, BaseMiddleware>;
  public constructor(
    configuration: ApplicationConfiguration
  ) {
    this.loadLogger(configuration.logger);
    this.$serviceContainer = new ServiceContainer();
    this.loadGlobalMiddleware();
    this.loadCustomMiddleware(configuration.middleware || {});
    this.loadServices(configuration.services);
    this.loadServiceProviders(configuration.serviceProviders || []);
    this.$eventHandler = configuration.eventHandler ? new configuration.eventHandler() : new EventHandler();
    this.loadEventHandler(configuration.events || {});
  }

  public async init() {
    const ps: Promise<void>[] = [];
    for (const serviceProvider of this.$serviceProviders) {
      ps.push(serviceProvider.run());
    }
    await Promise.all(ps);
  }

  public logger(): Logger {
    return this.$logger;
  }

  public call(action: string, request?: any, meta?: any): Promise<any> {
    const actionDetail: Action = this.$actions[action];
    if (!actionDetail) {
      throw new NotFoundError('Service not found');
    }

    const requestClass:  new (attributes: RequestAttributes) => Request = actionDetail.request || Request;
    request = new requestClass({
      params: request || {},
      meta: meta || {}
    });

    return this.preparePipeline(actionDetail, request).run();
  }

  private preparePipeline(actionDetail: Action, request: Request): Pipeline {
    const middleware: MiddlewareHandler[] = [];
    for (const middlewareName of actionDetail.middleware) {
      const m = this.middleware(middlewareName);
      middleware.push(m.handle.bind(m));
    }
    middleware.push(async (requestParam: Request, _: any, next: NextCallback): Promise<any> => {
      const response = await actionDetail.handler(requestParam);

      return next(response);
    });

    return new Pipeline(
      request,
      middleware
    )
  }

  private middleware(middlewareName: string): BaseMiddleware {
    const middleware: BaseMiddleware = this.$middleware[middlewareName];
    if (!middleware) {
      throw new BaseError(`Middleware "${middlewareName} is not registered`);
    }

    return middleware;
  }

  private loadServices(services: ApplicationService[]) {
    const globalMiddleware = ['validation'];
    for (const service of services) {
      const serviceInstance = this.loadService(service);
      const version = serviceInstance.version();
      const name = serviceInstance.name();
      const actionPrefix = `v${version}.${name}.`;
      const actions = serviceInstance.actions();
      const serviceMiddleware = serviceInstance.middleware();
      for (const actionName in actions) {
        const key = actionPrefix + actionName;
        let action: Action = actions[actionName]as Action;
        if (isFunction(action)) {
          action = {
            handler: action as any,
          };
        }
        if (!action.middleware) {
          action.middleware = [];
        }
        action.middleware = globalMiddleware.concat(
          serviceMiddleware,
          action.middleware
        );
        this.$actions[key] = action;
      }
    }
  }

  public emit(event: string, data: any): Promise<void> {
    return this.$eventHandler.dispatch(event, data);
  }

  public localEmit(event: string, data: any): Promise<void> {
    return this.$eventHandler.localDispatch(event, data);
  }

  public singleton(id: string, callback: SingletonCallback): void {
    this.$serviceContainer.singleton(id, callback);
  }

  public bind(id: string, callback: BindCallback): void {
    this.$serviceContainer.bind(id, callback);
  }

  public get(id: string): any {
    return this.$serviceContainer.get(id);
  }

  private loadEventHandler(events: Record<string, ApplicationEvent>) {
    for (const eventName in events) {
      const event = events[eventName];
      this.$eventHandler.register(eventName, new event(this));
    }
  }

  private loadServiceProviders(serviceProviders: ApplicationServiceProvider[]): void {
    for (const serviceProvider of serviceProviders) {
      this.$serviceProviders.push(new serviceProvider(this));
    }
  }

  private loadService(service: ApplicationService): BaseService {
    return new service(this);
  }

  private loadLogger(logger?: LoggerConfiguration): void {
    if (!logger || logger.type === 'fake') {
      this.$logger = new FakeLogger(this, 'all');
    } else {
      this.$logger = new ConsoleLogger(this, logger.level || 'all');
    }
  }
  private loadGlobalMiddleware() {
    this.$middleware = {
      validation: new ValidationMiddleware(this)
    };
  }

  private loadCustomMiddleware(middleware: Record<string, ApplicationMiddleware>) {
    for (const middlewareName in middleware) {
      this.$middleware[middlewareName] = new middleware[middlewareName](this);
    }
  }
}