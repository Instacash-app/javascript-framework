"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const baseError_1 = require("../Errors/baseError");
class EventHandler {
    constructor() {
        this.$events = {};
    }
    register(eventName, event) {
        this.$events[eventName] = event;
    }
    notify(eventName, data) {
        const event = this.$events[eventName];
        if (!event) {
            throw new baseError_1.BaseError(`Event ('${eventName}') is not registered`);
        }
        return event.notify(data);
    }
}
exports.EventHandler = EventHandler;
