"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const baseError_1 = require("./baseError");
class ErrorHandler {
    constructor($app) {
        this.$app = $app;
    }
    async handle(error) {
        const shouldReport = await this.shouldReport(error);
        if (shouldReport) {
            await this.report(error);
        }
    }
    async report(error) {
        return Promise.resolve();
    }
    shouldReport(error) {
        return Promise.resolve(true);
    }
    errorKey(error) {
        let prefix = 'unexpected';
        if (error instanceof baseError_1.BaseError) {
            prefix = error.key();
        }
        return `${prefix}.${error.message}`;
    }
}
exports.ErrorHandler = ErrorHandler;
