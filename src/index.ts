import * as middleware from './asyncMiddleware';
import * as storage from './asyncStorage';

export const generateLogger = storage.generate;

export const bindMiddleware = middleware.bindAsyncStorage;

export const defaultBinders = {
  requestId: middleware.reqIdBinder,
};
