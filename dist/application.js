"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Loggers_1 = require("./Loggers");
const Utils_1 = require("./Utils");
const request_1 = require("./request");
const Errors_1 = require("./Errors");
const Events_1 = require("./Events");
const cointainer_1 = require("./cointainer");
const Middleware_1 = require("./Middleware");
const pipeline_1 = require("./pipeline");
class Application {
    constructor(configuration) {
        this.$actions = {};
        this.$serviceProviders = [];
        this.loadLogger(configuration.logger);
        this.$serviceContainer = new cointainer_1.ServiceContainer();
        this.loadGlobalMiddleware();
        this.loadCustomMiddleware(configuration.middleware || {});
        this.loadServices(configuration.services);
        this.loadServiceProviders(configuration.serviceProviders || []);
        this.loadEventHandler(configuration.events || {});
        this.loadEventHandler(configuration.events || {});
    }
    async init() {
        const ps = [];
        for (const serviceProvider of this.$serviceProviders) {
            ps.push(serviceProvider.run());
        }
        await Promise.all(ps);
    }
    logger() {
        return this.$logger;
    }
    call(action, request, meta) {
        const actionDetail = this.$actions[action];
        if (!actionDetail) {
            throw new Errors_1.NotFoundError('Service not found');
        }
        const requestClass = actionDetail.request || request_1.Request;
        request = new requestClass({
            params: request || {},
            meta: meta || {}
        });
        return this.preparePipeline(actionDetail, request).run();
    }
    preparePipeline(actionDetail, request) {
        const middleware = [];
        for (const middlewareName of actionDetail.middleware) {
            const m = this.middleware(middlewareName);
            middleware.push(m.handle.bind(m));
        }
        middleware.push(async (requestParam, _, next) => {
            const response = await actionDetail.handler(requestParam);
            return next(response);
        });
        return new pipeline_1.Pipeline(request, middleware);
    }
    middleware(middlewareName) {
        const middleware = this.$middleware[middlewareName];
        if (!middleware) {
            throw new Errors_1.BaseError(`Middleware "${middlewareName} is not registered`);
        }
        return middleware;
    }
    loadServices(services) {
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
                let action = actions[actionName];
                if (Utils_1.isFunction(action)) {
                    action = {
                        handler: action,
                    };
                }
                if (!action.middleware) {
                    action.middleware = [];
                }
                action.middleware = globalMiddleware.concat(serviceMiddleware, action.middleware);
                this.$actions[key] = action;
            }
        }
    }
    emit(event, data) {
        return this.$eventHandler.notify(event, data);
    }
    singleton(id, callback) {
        this.$serviceContainer.singleton(id, callback);
    }
    bind(id, callback) {
        this.$serviceContainer.bind(id, callback);
    }
    get(id) {
        return this.$serviceContainer.get(id);
    }
    loadEventHandler(events) {
        this.$eventHandler = new Events_1.EventHandler();
        for (const eventName in events) {
            const event = events[eventName];
            this.$eventHandler.register(eventName, new event(this));
        }
    }
    loadServiceProviders(serviceProviders) {
        for (const serviceProvider of serviceProviders) {
            this.$serviceProviders.push(new serviceProvider(this));
        }
    }
    loadService(service) {
        return new service(this);
    }
    loadLogger(logger) {
        if (!logger || logger.type === 'fake') {
            this.$logger = new Loggers_1.FakeLogger(this, 'all');
        }
        else {
            this.$logger = new Loggers_1.ConsoleLogger(this, logger.level || 'all');
        }
    }
    loadGlobalMiddleware() {
        this.$middleware = {
            validation: new Middleware_1.ValidationMiddleware(this)
        };
    }
    loadCustomMiddleware(middleware) {
        for (const middlewareName in middleware) {
            this.$middleware[middlewareName] = new middleware[middlewareName](this);
        }
    }
}
exports.Application = Application;
