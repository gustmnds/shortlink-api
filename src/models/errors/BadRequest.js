"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const WebError_1 = require("./WebError");
class BadRequestError extends WebError_1.WebError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
