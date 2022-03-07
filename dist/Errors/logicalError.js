"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalError = void 0;
const baseError_1 = require("./baseError");
class LogicalError extends baseError_1.BaseError {
    constructor(message) {
        super(message);
        this.name = 'LogicalError';
        this.code = 400;
    }
    key() {
        return 'logical';
    }
}
exports.LogicalError = LogicalError;
