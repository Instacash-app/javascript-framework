"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const validator_1 = require("indicative/validator");
const sanitizer_1 = require("indicative/sanitizer");
const Utils_1 = require("./Utils");
class Request {
    constructor(attributes) {
        this.$validationRules = {};
        this.$sanitizationRules = {};
        this.$errors = {};
        if (!attributes) {
            attributes = {};
        }
        this.$attributes = attributes;
        if (!this.$attributes.params) {
            this.$attributes.params = {};
        }
        if (!this.$attributes.meta) {
            this.$attributes.meta = {};
        }
    }
    withUser(user) {
        this.$attributes.user = user;
        return this;
    }
    getUser() {
        return this.$attributes.user;
    }
    isAuthenticated() {
        return !!this.getUser();
    }
    async validate() {
        sanitizer_1.sanitize(this.$attributes.params, this.$sanitizationRules);
        try {
            await validator_1.validateAll(this.$attributes.params, this.$validationRules);
        }
        catch (e) {
            if (Array.isArray(e)) {
                this.setParsedErrors(e);
                return;
            }
            throw e;
        }
    }
    hasErrors() {
        return Object.keys(this.$errors).length !== 0;
    }
    errors() {
        return this.$errors;
    }
    withErrors(errors) {
        this.$errors = errors;
        return this;
    }
    withParams(params) {
        this.$attributes.params = params;
        return this;
    }
    params() {
        return this.$attributes.params;
    }
    get(key, defaultValue) {
        return Utils_1.getObjectKey(this.$attributes.params, key, defaultValue);
    }
    getMeta(key, defaultValue) {
        if (!key) {
            return this.$attributes.meta;
        }
        return Utils_1.getObjectKey(this.$attributes.meta, key, defaultValue);
    }
    setParsedErrors(errors) {
        for (const error of errors) {
            if (!this.$errors[error.field]) {
                this.$errors[error.field] = [];
            }
            this.$errors[error.field].push(error.message);
        }
    }
}
exports.Request = Request;
