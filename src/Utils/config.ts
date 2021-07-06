import {getObjectKey} from './object';

export class Config {
  private static $configurations: Record<string, any> = {};

  public static load(configurations: Record<string, any>) {
    return Config.$configurations = configurations;
  }

  public static get(key: string, defaultValue?: any): any {
    return getObjectKey(Config.$configurations, key, defaultValue);
  }
}

export const config = (key: string, defaultValue?: any): any => {
  return Config.get(key, defaultValue)
};