"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = void 0;
const isFunction = (functionToCheck) => {
    if (!functionToCheck) {
        return false;
    }
    const type = {}.toString.call(functionToCheck);
    return type === '[object Function]' || type === '[object AsyncFunction]';
};
exports.isFunction = isFunction;
