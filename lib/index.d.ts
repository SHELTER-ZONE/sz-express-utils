declare module '@shelter-zone/sz-express-utils/index' {
  const _default: {
      test: (a: number, b: number) => number;
  };
  export default _default;

}
declare module '@shelter-zone/sz-express-utils/lib/middleware/index' {
  import { Request, Response, NextFunction } from 'express';
  import { ObjectSchema } from 'joi';
  const _default: () => {
      requestDataValidate: (model: ObjectSchema, dataFrom: 'query' | 'body') => (req: Request, res: Response, next: NextFunction) => Promise<void>;
  };
  export default _default;

}
declare module '@shelter-zone/sz-express-utils/modules' {
  module '@shelter-zone/sz-express-utils/lib/middleware' {
      import main = require('@shelter-zone/sz-express-utils/src/middleware/index');
      export = main;
  }

}
declare module '@shelter-zone/sz-express-utils' {
  import main = require('@shelter-zone/sz-express-utils/src/index');
  export = main;
}