"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
const Errors_1 = require("./Errors");
const Utils_1 = require("./Utils");
class ServiceContainer {
    constructor() {
        this.$data = {};
    }
    singleton(id, callback) {
        this.register(id, callback, 'SINGLETON');
    }
    bind(id, callback) {
        this.register(id, callback, 'BIND');
    }
    get(id) {
        const info = this.info(id);
        if (info.type === 'BIND') {
            return info.data();
        }
        const data = info.data;
        if (Utils_1.isFunction(data)) {
            info.data = data();
        }
        return info.data;
    }
    info(id) {
        const info = this.$data[id];
        if (!info) {
            throw new Errors_1.BaseError(`${id} is not configured`);
        }
        return info;
    }
    register(id, callback, type) {
        this.$data[id] = {
            type,
            data: callback
        };
    }
}
exports.ServiceContainer = ServiceContainer;
