"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeLogger = void 0;
const base_1 = require("./base");
class FakeLogger extends base_1.BaseLogger {
    fatal(...args) {
        this.log('fatal', ...args);
    }
    error(...args) {
        this.log('error', ...args);
    }
    warn(...args) {
        this.log('warn', ...args);
    }
    info(...args) {
        this.log('info', ...args);
    }
    debug(...args) {
        this.log('debug', ...args);
    }
    trace(...args) {
        this.log('trace', ...args);
    }
    log(level, ...args) {
        //Do nothing
    }
}
exports.FakeLogger = FakeLogger;
