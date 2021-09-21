import {AsyncLocalStorage} from 'async_hooks';
import pino from 'pino';

export const loggerContext = new AsyncLocalStorage<Map<string, string>>();

export const generate = (storageTuple: {[k: string]: string}, instance?: pino.Logger) => {
  const base = {
    mixin: () => {
      return Object.keys(storageTuple).reduce((p, k) => {
        const storeVal = loggerContext.getStore()?.get(storageTuple[k]);
        if (storeVal) {
          p[k] = storeVal;
        }
        return p;
      }, {} as {[k: string]: string});
    },
  };
  return instance ? instance.child(base) : pino(base);
};
