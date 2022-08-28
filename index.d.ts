declare module '@shelter-zone/sz-express-utils/index' {
  export * from '@shelter-zone/sz-express-utils/middleware/index';
  export * from '@shelter-zone/sz-express-utils/middleware/validate';
  export * from '@shelter-zone/sz-express-utils/logger';

}
declare module '@shelter-zone/sz-express-utils/logger' {
  import Signale from 'signale';
  export const signale: Signale.Signale<"debug" | "info" | "success" | "warn" | "request">;
  export const log: ({ level, message }: {
      level: string;
      message: string;
  }) => void;

}
declare module '@shelter-zone/sz-express-utils/middleware/index' {
  export * from '@shelter-zone/sz-express-utils/middleware/validate';
  import { Request, Response, NextFunction } from 'express';
  global {
      namespace Express {
          interface Response {
              ok: (data?: any) => void;
              fail: ({ status, code, message }: ErrorResponse) => void;
          }
      }
  }
  export interface ResponseFormat {
      status: number;
      code?: string;
      message?: string;
      data?: any;
  }
  export interface ErrorResponse {
      status?: number;
      code?: string;
      message?: string;
  }
  /**
   * 格式化回應格式
   */
  export const resFormat: ({ status, code, message, data }: ResponseFormat) => {
      status: number;
      code: string;
      message: string;
      data: any;
  };
  /**
   * res.send 擴充 (ok、fail)
   */
  export const sendResponse: (_req: Request, res: Response, next: NextFunction) => void;
  export const ignoreRequestStrings: Array<string>;
  export const routeLog: (req: Request, _res: Response, next: NextFunction) => void;
  export function disableCaching(req: Request, res: Response, next: NextFunction): void;

}
declare module '@shelter-zone/sz-express-utils/middleware/validate' {
  import { Request, Response, NextFunction } from 'express';
  import { ObjectSchema } from 'joi';
  /**
   * 驗證請求攜帶的資料是否合法
   * @param model: joi model
   * @param dataFrom: 'query' | 'body'
   */
  export const requestDataValidate: (model: ObjectSchema, dataFrom: 'query' | 'body') => (req: Request, res: Response, next: NextFunction) => Promise<void>;
  /**
   * 驗證請求的使用者的 userToken 是否合法
   * @param authDB: deta base
   * @param PRIVATEKEY: string
   */
  export const useApiAuthentication: (authDB: any, PRIVATEKEY: string) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;

}
declare module '@shelter-zone/sz-express-utils' {
  import main = require('@shelter-zone/sz-express-utils/src/index');
  export = main;
}