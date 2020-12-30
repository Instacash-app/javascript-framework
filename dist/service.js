"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor($app) {
        this.$app = $app;
    }
    emit(event, data) {
        return this.$app.emit(event, data);
    }
}
exports.BaseService = BaseService;
