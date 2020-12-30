import {BaseError} from './Errors';
import {isFunction} from './Utils';

export type SingletonCallback = () => any;
export type BindCallback = (data: any) => any;


type TYPE = 'SINGLETON'| 'BIND';
type Info = {
  type: TYPE;
  data: SingletonCallback | BindCallback | any
}

export class ServiceContainer {
  private $data: Record<string, Info> = {};

  public singleton(id: string, callback: SingletonCallback): void {
    this.register(id, callback, 'SINGLETON');
  }

  public bind(id: string, callback: BindCallback): void {
    this.register(id, callback, 'BIND');
  }

  public get(id: string): any {
    const info: Info = this.info(id);
    if (info.type === 'BIND') {
      return info.data();
    }
    const data = info.data;
    if (isFunction(data)) {
      info.data = data();
    }

    return info.data;
  }

  private info(id: string): Info {
    const info: Info = this.$data[id];
    if (!info) {
      throw new BaseError(`${id} is not configured`);
    }

    return info;
  }

  private register(id: string, callback: SingletonCallback | BindCallback, type: TYPE): void {
    this.$data[id] = {
      type,
      data: callback
    };
  }
}