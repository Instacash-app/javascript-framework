import { existsSync } from 'fs';
import {getObjectKey} from './object';

export class Config {
  private static $folderPath = '';
  private static $configurations: Record<string, any> = {};

  public static configurePath(path: string) {
    return Config.$folderPath = path;
  }

  public static get(key: string, defaultValue?: any): any {
    const keys: string[] = key.split('.');
    const file: string = keys.shift();
    Config.loadFile(file);

    return keys.length === 0 ?
      Config.$configurations[file] :
      getObjectKey(Config.$configurations[file], keys.join('.'), defaultValue);
  }

  private static loadFile(file: string) {
    if (Config.$configurations[file]) {
      return;
    }
    const filePath = `${Config.$folderPath}/${file}`;

    Config.$configurations[file] = Config.existsFile(filePath) ?
      require(filePath).default : {}
  }

  private static existsFile(path: string) {
    return existsSync(`${path}.js`) ||
      existsSync(`${path}.ts`) ||
      existsSync(`${path}.json`)
  }
}

export const config = (key: string, defaultValue?: any): any => {
  return Config.get(key, defaultValue)
};