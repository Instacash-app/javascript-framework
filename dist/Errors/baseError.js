"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unexpected';
        this.code = 500;
    }
    isReportable() {
        return true;
    }
    info() {
        return {
            type: this.name,
            message: this.message
        };
    }
}
exports.BaseError = BaseError;
