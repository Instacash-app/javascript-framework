"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor($app) {
        this.$app = $app;
        this.$notifiers = [];
        for (const notifier of this.notifiers()) {
            this.$notifiers.push(new notifier($app));
        }
    }
    async notify(data) {
        const ps = [];
        for (const notifier of this.$notifiers) {
            ps.push(notifier.handle(data));
        }
        await Promise.all(ps);
    }
}
exports.Event = Event;
