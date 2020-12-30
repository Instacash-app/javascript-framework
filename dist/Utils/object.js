"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectKey = void 0;
const getObjectKey = (object, key, defaultValue) => {
    if (typeof object !== 'object' || object === null) {
        return defaultValue;
    }
    const keys = key.split('.');
    const objectKey = keys.shift();
    const value = object[objectKey];
    if (value === undefined) {
        return defaultValue;
    }
    return keys.length === 0 ? value : exports.getObjectKey(value, keys.join('.'), defaultValue);
};
exports.getObjectKey = getObjectKey;
