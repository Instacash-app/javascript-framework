"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const Loggers_1 = require("./Loggers");
const function_1 = require("./Utils/function");
const request_1 = require("./request");
const notFoundError_1 = require("./Errors/notFoundError");
const handler_1 = require("./Events/handler");
const cointainer_1 = require("./cointainer");
class Application {
    constructor(configuration) {
        this.$actions = {};
        this.$serviceProviders = [];
        this.loadLogger(configuration.logger);
        this.$serviceContainer = new cointainer_1.ServiceContainer();
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
    async call(action, request) {
        const actionDetail = this.$actions[action];
        if (!actionDetail) {
            throw new notFoundError_1.NotFoundError('Service not found');
        }
        const requestClass = actionDetail.request || request_1.Request;
        request = new requestClass({
            params: request || {}
        });
        return await actionDetail.handler(request);
    }
    loadServices(services) {
        for (const service of services) {
            const serviceInstance = this.loadService(service);
            const version = serviceInstance.version();
            const name = serviceInstance.name();
            const actionPrefix = `v${version}.${name}.`;
            const actions = serviceInstance.actions();
            for (const actionName in actions) {
                const key = actionPrefix + actionName;
                let action = actions[actionName];
                if (function_1.default(action)) {
                    action = {
                        handler: action,
                    };
                }
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
        this.$eventHandler = new handler_1.EventHandler();
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
}
exports.Application = Application;
