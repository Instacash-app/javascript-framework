"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const baseError_1 = require("./baseError");
class ErrorHandler {
    constructor($app) {
        this.$app = $app;
    }
    async handle(error) {
        if (this.shouldReport(error)) {
            await this.report(error);
        }
    }
    async report(error) {
        return Promise.resolve();
    }
    shouldReport(error) {
        if (error instanceof baseError_1.BaseError) {
            return error.isReportable();
        }
        return true;
    }
}
exports.ErrorHandler = ErrorHandler;
