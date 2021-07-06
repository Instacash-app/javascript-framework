"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Config = void 0;
const object_1 = require("./object");
class Config {
    static load(configurations) {
        return Config.$configurations = configurations;
    }
    static get(key, defaultValue) {
        return object_1.getObjectKey(Config.$configurations, key, defaultValue);
    }
}
exports.Config = Config;
Config.$configurations = {};
const config = (key, defaultValue) => {
    return Config.get(key, defaultValue);
};
exports.config = config;
