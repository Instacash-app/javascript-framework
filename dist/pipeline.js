"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
class Pipeline {
    constructor($input, $middleware) {
        this.$input = $input;
        this.$middleware = $middleware;
    }
    run() {
        return this.execute(0);
    }
    execute(index, response) {
        const currentMiddleware = this.$middleware[index];
        if (!currentMiddleware) {
            return Promise.resolve(response);
        }
        return currentMiddleware(this.$input, response, (responseParam) => {
            return this.execute(++index, responseParam);
        });
    }
}
exports.Pipeline = Pipeline;
