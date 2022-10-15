"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  disableCaching: () => disableCaching,
  ignoreRequestStrings: () => ignoreRequestStrings,
  log: () => log,
  requestDataValidate: () => requestDataValidate,
  resFormat: () => resFormat,
  routeLog: () => routeLog,
  sendResponse: () => sendResponse,
  signale: () => signale,
  useApiAuthentication: () => useApiAuthentication
});
module.exports = __toCommonJS(src_exports);

// src/utils/logger.ts
var import_signale = __toESM(require("signale"));
var import_dayjs = __toESM(require("dayjs"));
var signale = new import_signale.default.Signale({
  scope: "WebCrate",
  logLevel: process.env.LOG_LEVEL || "info",
  types: {
    success: {
      badge: "\u2705",
      color: "green",
      label: "success",
      logLevel: "debug"
    },
    info: {
      badge: "\u2139\uFE0F",
      color: "blue",
      label: "info",
      logLevel: "debug"
    },
    request: {
      badge: "\u{1F4EB}",
      color: "gray",
      label: "request",
      logLevel: "debug"
    },
    debug: {
      badge: "\u{1F537}",
      color: "cyan",
      label: "debug",
      logLevel: "info"
    },
    warn: {
      badge: "\u26A0\uFE0F",
      color: "yellow",
      label: "warn",
      logLevel: "info"
    }
  }
});
var log = ({ level, message }) => {
  if (Reflect.has(signale, level)) {
    const levelSignale = signale[level];
    levelSignale({
      prefix: `[${(0, import_dayjs.default)().format("YYYY-MM-DD HH:mm:ss")}]`,
      message,
      suffix: "(@klauscfhq)"
    });
    return;
  }
  signale.warn(`Invalid log level: ${level}`);
};

// src/middleware/base.ts
var import_dayjs2 = __toESM(require("dayjs"));
var resFormat = ({ status, code, message, data }) => ({
  status,
  code: code || "",
  message: message || "",
  data
});
var sendResponse = (_req, res, next) => {
  res.ok = (data) => {
    res.json(data);
  };
  res.fail = ({ status, code, message }) => {
    status = status ?? 500;
    if (!message && status === 500)
      message = "unknow server internal error";
    res.status(status).json(
      resFormat({
        status,
        code,
        message
      })
    );
  };
  next();
};
var ignoreRequestStrings = [
  "js/",
  "css/",
  "img/",
  "static/",
  "_nuxt",
  "manifest.json"
];
var routeLog = (req, _res, next) => {
  if (ignoreRequestStrings.some((value) => req.originalUrl.includes(value)) || req.method === "HEAD") {
    return next();
  }
  const nowTime = (0, import_dayjs2.default)().format("YYYY-MM-DD HH:mm:ss");
  log({
    level: "request",
    message: `${nowTime} ${req.method} ${req.originalUrl}`
  });
  next();
};
function disableCaching(req, res, next) {
  if (req.originalUrl === "/") {
    res.set("Cache-control", "no-store");
  }
  next();
}

// src/middleware/validate.ts
var import_jsonwebtoken = require("jsonwebtoken");
var requestDataValidate = (model, dataFrom) => {
  return async (req, res, next) => {
    try {
      if (dataFrom === "query")
        req.query = await model.validateAsync(req.query);
      else if (dataFrom === "body")
        req.query = await model.validateAsync(req.body);
    } catch (error) {
      res.status(400).send(error.message);
      return;
    }
    next();
  };
};
var useApiAuthentication = (authDB, PRIVATEKEY) => {
  const apiAuthentication = async (req, res, next) => {
    const userToken = req.headers.authorization;
    if (!userToken)
      return res.status(401).send("unauthorized");
    if (userToken) {
      try {
        const decodeRes = (0, import_jsonwebtoken.verify)(userToken, PRIVATEKEY);
        const existUser = await authDB.fetch({ id: decodeRes.user.id });
        if (!existUser.count)
          return res.status(401).send("forbidden");
      } catch (error) {
        return res.status(401).send("internal server error");
      }
    }
    next();
  };
  return apiAuthentication;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  disableCaching,
  ignoreRequestStrings,
  log,
  requestDataValidate,
  resFormat,
  routeLog,
  sendResponse,
  signale,
  useApiAuthentication
});
