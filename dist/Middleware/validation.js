"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const base_1 = require("./base");
const Errors_1 = require("../Errors");
class ValidationMiddleware extends base_1.BaseMiddleware {
    async handle(request, response, next) {
        await request.validate();
        if (request.hasErrors()) {
            throw new Errors_1.ValidationError('Validation error', request.errors());
        }
        return next(response);
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
