
export const getObjectKey = (object: any, key: string, defaultValue?: any): any => {
  if (typeof object !== 'object' || object === null) {
    return defaultValue;
  }
  const keys: string[] = key.split('.');
  const objectKey: string = keys.shift();
  const value = object[objectKey];
  if (value === undefined) {
    return defaultValue;
  }

  return keys.length === 0 ? value : getObjectKey(value, keys.join('.'), defaultValue);
};