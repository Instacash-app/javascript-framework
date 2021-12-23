"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const notFoundError_1 = require("./notFoundError");
const validationError_1 = require("./validationError");
class ErrorHandler {
    constructor($app) {
        this.$app = $app;
        this.$dontReport = [
            notFoundError_1.NotFoundError,
            validationError_1.ValidationError,
        ];
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
        for (const errorClass of this.$dontReport) {
            if (error instanceof errorClass) {
                return false;
            }
        }
        return true;
    }
}
exports.ErrorHandler = ErrorHandler;
