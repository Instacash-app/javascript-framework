"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceContainer = void 0;
const baseError_1 = require("./Errors/baseError");
const function_1 = require("./Utils/function");
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
        if (function_1.default(data)) {
            info.data = data();
        }
        return info.data;
    }
    info(id) {
        const info = this.$data[id];
        if (!info) {
            throw new baseError_1.BaseError(`${id} is not configured`);
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
