"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/lib/middleware/index.ts
var middleware_exports = {};
__export(middleware_exports, {
  default: () => middleware_default
});
module.exports = __toCommonJS(middleware_exports);
var middleware_default = () => {
  const requestDataValidate = (model, dataFrom) => {
    return (req, res, next) => __async(void 0, null, function* () {
      try {
        if (dataFrom === "query")
          yield model.validateAsync(req.query);
        else if (dataFrom === "body")
          yield model.validateAsync(req.body);
      } catch (error) {
        res.status(400).send(error.message);
        return;
      }
      next();
    });
  };
  return {
    requestDataValidate
  };
};
