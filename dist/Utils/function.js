"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(functionToCheck) {
    if (!functionToCheck) {
        return false;
    }
    const type = {}.toString.call(functionToCheck);
    return type === '[object Function]' || type === '[object AsyncFunction]';
}
exports.default = isFunction;
