"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const baseError_1 = require("./baseError");
class ValidationError extends baseError_1.BaseError {
    constructor(message, errorMessages) {
        super(message);
        this.name = 'ValidationError';
        this.code = 422;
        this.errorMessages = {};
        this.errorMessages = errorMessages;
    }
    isReportable() {
        return false;
    }
    info() {
        const info = super.info();
        info.detail = this.errorMessages;
        return info;
    }
}
exports.ValidationError = ValidationError;
