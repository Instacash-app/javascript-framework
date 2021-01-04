import {
  BaseService,
  Action,
  ActionHandler,
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
import {NotFoundError, ValidationError} from './Errors';
import {Event, EventHandler} from './Events';
import {BindCallback, ServiceContainer, SingletonCallback} from './cointainer';

export type LoggerConfiguration = {
  type: 'fake' | 'console',
  level?: LEVEL
};
export type ApplicationService = new (app: Application) => BaseService;
export type ApplicationServiceProvider = new (app: Application) => BaseServiceProvider;
export type ApplicationEvent = new (app: Application) => Event;

type ApplicationConfiguration = {
  services: ApplicationService[];
  logger?: LoggerConfiguration;
  serviceProviders?: ApplicationServiceProvider[];
  events?: Record<string, ApplicationEvent>;
};

export class Application {
  private $actions: Record<string, Action> = {}
  private $logger: Logger;
  private $eventHandler: EventHandler;
  private $serviceProviders: BaseServiceProvider[] = [];
  private $serviceContainer: ServiceContainer;
  public constructor(
    configuration: ApplicationConfiguration
  ) {
    this.loadLogger(configuration.logger);
    this.$serviceContainer = new ServiceContainer();
    this.loadServices(configuration.services);
    this.loadServiceProviders(configuration.serviceProviders || []);
    this.loadEventHandler(configuration.events || {});
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

  public async call(action: string, request?: any): Promise<any> {
    const actionDetail: Action = this.$actions[action];
    if (!actionDetail) {
      throw new NotFoundError('Service not found');
    }

    const requestClass:  new (attributes: RequestAttributes) => Request = actionDetail.request || Request;
    request = new requestClass({
      params: request || {}
    });
    await this.validateRequest(request);

    return await actionDetail.handler(request);
  }

  private loadServices(services: ApplicationService[]) {
    for (const service of services) {
      const serviceInstance = this.loadService(service);
      const version = serviceInstance.version();
      const name = serviceInstance.name();
      const actionPrefix = `v${version}.${name}.`;
      const actions = serviceInstance.actions();
      for (const actionName in actions) {
        const key = actionPrefix + actionName;
        let action: Action | ActionHandler = actions[actionName];
        if (isFunction(action)) {
          action = {
            handler: action,
          } as Action;
        }
        this.$actions[key] = action as Action;
      }
    }
  }

  public emit(event: string, data: any): Promise<void> {
    return this.$eventHandler.notify(event, data);
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
    this.$eventHandler = new EventHandler();
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

  private async validateRequest(request: Request) {
    await request.validate();
    if (request.hasErrors()) {
      throw new ValidationError('Validation error', request.errors())
    }
  }
}