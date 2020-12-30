import { validate } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer';
import getObjectKey from './Utils/object';

export type RequestAttributes = {
  user?: any;
  params?: Record<string, any>;
  meta?: Record<string, any>;
};
export type ValidationRules = Record<string, string>;
export type SanitizationRules  = Record<string, string>;
export type Errors = {
  [field: string]: string[]
};

export class Request {
  protected $validationRules: ValidationRules = {};
  protected $sanitizationRules: SanitizationRules = {};
  private $attributes: RequestAttributes;
  private $errors: Errors = {};

  constructor(attributes?: RequestAttributes) {
    if (!attributes) {
      attributes = {};
    }
    this.$attributes = attributes;
    if (!this.$attributes.params) {
      this.$attributes.params = {};
    }
  }

  public async validate() {
    sanitize(this.$attributes.params, this.$sanitizationRules);
    try {
      await validate(this.$attributes.params, this.$validationRules);
    } catch (e) {
      if (Array.isArray(e)) {
        this.setParsedErrors(e);
        return;
      }
      throw e;
    }
  }

  public hasErrors(): boolean {
    return Object.keys(this.$errors).length !== 0;
  }

  public errors(): Errors {
    return this.$errors;
  }

  public withParams(params: Record<string, any>): this {
    this.$attributes.params = params;

    return this;
  }

  public params(): Record<string, any> {
    return this.$attributes.params;
  }

  public get(key: string, defaultValue: any) {
    return getObjectKey(this.$attributes.params, key, defaultValue);
  }

  private setParsedErrors(errors: any[]) {
    for (const error of errors) {
      if (!this.$errors[error.field]) {
        this.$errors[error.field] = [];
      }
      this.$errors[error.field].push(error.message);
    }
  }
}