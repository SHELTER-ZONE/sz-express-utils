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
  export const requestDataValidate: (model: ObjectSchema, dataFrom: 'query' | 'body') => (req: Request, res: Response, next: NextFunction) => Promise<void>;

}
declare module '@shelter-zone/sz-express-utils' {
  import main = require('@shelter-zone/sz-express-utils/src/index');
  export = main;
}