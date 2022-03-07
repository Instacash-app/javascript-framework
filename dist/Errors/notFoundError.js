"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const baseError_1 = require("./baseError");
class NotFoundError extends baseError_1.BaseError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.code = 404;
    }
    key() {
        return 'not-found';
    }
}
exports.NotFoundError = NotFoundError;
