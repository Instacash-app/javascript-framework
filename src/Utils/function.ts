export const isFunction = (functionToCheck: any) => {
  if (!functionToCheck) {
    return false;
  }
  const type: string = {}.toString.call(functionToCheck);

  return type === '[object Function]' || type === '[object AsyncFunction]';
};