
export class BaseError extends Error {
  public name = 'Unexpected';
  public code = 500;
  constructor(message: string) {
    super(message);
  }

  public info(): Record<string, any> {
    return {
      type: this.name,
      message: this.message
    }
  }
}