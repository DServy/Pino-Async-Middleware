import {loggerContext} from './asyncStorage';
import {NextFunction, Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';

type binder = (req: Request, res: Response) => Map<string, string>;

// NOTE: This needs to be first in the Middleware Chain
export const bindAsyncStorage = (bind: binder) => (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  return loggerContext.run(bind(req, res), next);
};

//default binder types for use

export const reqIdBinder =
  (idHeader = 'X-Request-Id', storeKey = 'requestId'): binder =>
  (req: Request, res: Response) => {
    // If we have a request id from the header, use that, if not gen one
    const id = req.get(idHeader) || uuidv4();
    res.setHeader(idHeader, id);
    const store = new Map<string, string>();
    store.set(storeKey, id);
    return store;
  };
