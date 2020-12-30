"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Config = void 0;
const fs_1 = require("fs");
const object_1 = require("./object");
class Config {
    static configurePath(path) {
        return Config.$folderPath = path;
    }
    static get(key, defaultValue) {
        const keys = key.split('.');
        const file = keys.shift();
        Config.loadFile(file);
        return keys.length === 0 ?
            Config.$configurations[file] :
            object_1.getObjectKey(Config.$configurations[file], keys.join('.'), defaultValue);
    }
    static loadFile(file) {
        if (Config.$configurations[file]) {
            return;
        }
        const filePath = `${Config.$folderPath}/${file}`;
        Config.$configurations[file] = Config.existsFile(filePath) ?
            require(filePath).default : {};
    }
    static existsFile(path) {
        return fs_1.existsSync(`${path}.js`) ||
            fs_1.existsSync(`${path}.ts`) ||
            fs_1.existsSync(`${path}.json`);
    }
}
exports.Config = Config;
Config.$folderPath = '';
Config.$configurations = {};
const config = (key, defaultValue) => {
    return Config.get(key, defaultValue);
};
exports.config = config;
