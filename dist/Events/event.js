"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor($app) {
        this.$app = $app;
        this.$listeners = [];
        for (const listener of this.listeners()) {
            this.$listeners.push(new listener($app));
        }
    }
    async execute(data) {
        const ps = [];
        for (const listener of this.$listeners) {
            ps.push(listener.handle(data));
        }
        await Promise.all(ps);
    }
}
exports.Event = Event;
