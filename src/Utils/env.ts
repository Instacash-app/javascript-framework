
export class Env {
  public static get(key: string, defaultValue?: any): any {
    const value: string | undefined = process.env[key]
    if (value === undefined) {
      return defaultValue;
    }

    return Env.parse(value);
  }

  private static parse(value: string): any {
    switch (value.toLowerCase()) {
      case 'true':
      case '(true)':
        return true;
      case 'false':
      case '(false)':
        return false;
      case 'empty':
      case '(empty)':
        return '';
      case 'null':
      case '(null)':
        return null;
      default: return value;
    }
  }
}

export default function env(key: string, defaultValue?: any): any {
  return Env.get(key, defaultValue);
}