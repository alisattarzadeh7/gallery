import { AxiosError } from 'axios';
import {Request} from "~/src/Utils/Facades/Request";

import ExceptionOf403 from "~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf403";
import ExceptionOf401 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf401';
import ExceptionOf404 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf404';
import ExceptionOf500 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf500';
import ExceptionOf410 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf410';
import ExceptionOf400 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf400';
import ExceptionOf409 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf409';
import ExceptionOf429 from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOf429';
import ExceptionOfUnknownError from '~/src/Utils/Handlers/ErrorHandler/defaultExceptions/ExceptionOfUnknownError';

export type IDefaultExceptionHandler = () => void;

export type IErrorHandlerHelpers = {
  retry: (res: (res: Request) => void) => void;
};

export type IDefaultException = (
  error: AxiosError,
  helpers: {
    requestHelpers: IErrorHandlerHelpers;
  }
) => void;

type ICustomExceptionHelpers = {
  requestHelpers: IErrorHandlerHelpers;
  defaultHandler: IDefaultExceptionHandler;
};

export type ICustomException = (error: AxiosError, helpers: ICustomExceptionHelpers) => any;




export type IErrorHandler = {
  [x in keyof ErrorHandler]: (
    error: AxiosError,
    helpers: {
      requestHelpers: IErrorHandlerHelpers;
      defaultHandler: IDefaultExceptionHandler;
    }
  ) => any;
};

export default class ErrorHandler implements IErrorHandler {
  500: ICustomException | IDefaultException = ExceptionOf500;
  404: ICustomException | IDefaultException = ExceptionOf404;
  401: ICustomException | IDefaultException = ExceptionOf401;
  403: ICustomException | IDefaultException = ExceptionOf403;
  400: ICustomException | IDefaultException = ExceptionOf400;
  409: ICustomException | IDefaultException = ExceptionOf409;
  410: ICustomException | IDefaultException = ExceptionOf410;
  429: ICustomException | IDefaultException = ExceptionOf429;
  unknown: ICustomException | IDefaultException = ExceptionOfUnknownError;

  static async handle(error: AxiosError, reqHelpers: IErrorHandlerHelpers, params?: Partial<IErrorHandler>) {
    const errHandler = new ErrorHandler();
    const customErrorHandler = { ...errHandler, ...params } as ErrorHandler;
    if (error && error.response?.status) {
      let responseStatus = error.response.status as keyof ErrorHandler;
      let defaultHandler = errHandler[responseStatus] as IDefaultException;

      if (customErrorHandler) {
        if (customErrorHandler[responseStatus]) {
          await customErrorHandler[responseStatus](error, {
            requestHelpers: reqHelpers,
            defaultHandler: () =>
              defaultHandler(error, {
                requestHelpers: reqHelpers,
              }),
          });
        } else {
          defaultHandler = errHandler.unknown as IDefaultException;
          await customErrorHandler.unknown(error, {
            requestHelpers: reqHelpers,
            defaultHandler: () =>
              defaultHandler(error, {
                requestHelpers: reqHelpers,
              }),
          });
        }
      }
    }
  }
}
