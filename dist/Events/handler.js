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
    dispatch(eventName, data) {
        return this.localDispatch(eventName, data);
    }
    localDispatch(eventName, data) {
        return this.event(eventName)
            .dispatch(data);
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
