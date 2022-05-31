"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const Errors_1 = require("../Errors");
class EventHandler {
    constructor() {
        this.$events = {};
    }
    register(eventName, event) {
        this.$events[eventName] = event;
    }
    emit(eventName, data) {
        return this.execute(eventName, data);
    }
    queue(eventName, data, eventOptions) {
        return this.execute(eventName, data);
    }
    execute(eventName, data) {
        return this.event(eventName)
            .execute(data);
    }
    event(eventName) {
        const event = this.$events[eventName];
        if (!event) {
            throw new Errors_1.BaseError(`Event ('${eventName}') is not registered`);
        }
        return event;
    }
}
exports.EventHandler = EventHandler;
