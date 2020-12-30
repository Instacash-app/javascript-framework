"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
class Env {
    static get(key, defaultValue) {
        const value = process.env[key];
        if (value === undefined) {
            return defaultValue;
        }
        return Env.parse(value);
    }
    static parse(value) {
        switch (value.toLowerCase()) {
            case 'true':
            case '(true)':
                return true;
            case 'false':
            case '(false)':
                return false;
            case 'empty':
            case '(empty)':
                return '';
            case 'null':
            case '(null)':
                return null;
            default: return value;
        }
    }
}
exports.Env = Env;
function env(key, defaultValue) {
    return Env.get(key, defaultValue);
}
exports.default = env;
