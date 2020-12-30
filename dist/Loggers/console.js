"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const base_1 = require("./base");
class ConsoleLogger extends base_1.BaseLogger {
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
        if (!this.isValidLevel(level)) {
            return;
        }
        switch (level) {
            case 'fatal':
            case 'error': return console.error(...args);
            case 'warn': return console.warn(...args);
            default: return console.log(...args);
        }
    }
    isValidLevel(level) {
        //TODO Check if some levels include some others
        return this.$level === 'all' || this.$level === level;
    }
}
exports.ConsoleLogger = ConsoleLogger;
