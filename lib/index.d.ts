declare module '@shelter-zone/sz-express-utils/index' {
  const _default: {
      test: (a: number, b: number) => number;
  };
  export default _default;

}
declare module '@shelter-zone/sz-express-utils/lib/logger' {
  import Signale from 'signale';
  export const signale: Signale.Signale<"debug" | "info" | "success" | "warn" | "request">;
  export const log: ({ level, message }: {
      level: string;
      message: string;
  }) => void;

}
declare module '@shelter-zone/sz-express-utils/lib/middleware/validate' {
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