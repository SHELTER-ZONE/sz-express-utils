import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import Signale from 'signale';

declare global {
    namespace Express {
        interface Response {
            ok: (data?: any) => void;
            fail: ({ status, code, message }: ErrorResponse) => void;
        }
    }
}
interface ResponseFormat {
    status: number;
    code?: string;
    message?: string;
    data?: any;
}
interface ErrorResponse {
    status?: number;
    code?: string;
    message?: string;
}
/**
 * 格式化回應格式
 */
declare const resFormat: ({ status, code, message, data }: ResponseFormat) => {
    status: number;
    code: string;
    message: string;
    data: any;
};
/**
 * res.send 擴充 (ok、fail)
 */
declare const sendResponse: (_req: Request, res: Response, next: NextFunction) => void;
declare const ignoreRequestStrings: Array<string>;
declare const routeLog: (req: Request, _res: Response, next: NextFunction) => void;
declare function disableCaching(req: Request, res: Response, next: NextFunction): void;

/**
 * 驗證請求攜帶的資料是否合法
 * @param model: joi model
 * @param dataFrom: 'query' | 'body'
 */
declare const requestDataValidate: (model: ObjectSchema, dataFrom: 'query' | 'body') => (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * 驗證請求的使用者的 userToken 是否合法
 * @param authDB: deta base
 * @param PRIVATEKEY: string
 */
declare const useApiAuthentication: (authDB: any, PRIVATEKEY: string) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;

declare const signale: Signale.Signale<"debug" | "info" | "success" | "warn" | "request">;
declare const log: ({ level, message }: {
    level: string;
    message: string;
}) => void;

export { ErrorResponse, ResponseFormat, disableCaching, ignoreRequestStrings, log, requestDataValidate, resFormat, routeLog, sendResponse, signale, useApiAuthentication };
