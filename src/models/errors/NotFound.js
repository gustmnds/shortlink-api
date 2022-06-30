"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const WebError_1 = require("./WebError");
class NotFoundError extends WebError_1.WebError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
