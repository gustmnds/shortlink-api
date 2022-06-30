"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const WebError_1 = require("../models/errors/WebError");
/**
 * Catch all errors and send to user in response
 * ```ts
 * app.use(errorHandler);
 * ```
 */
function errorHandler(err, request, response, 
// eslint-disable-next-line no-unused-vars
_next) {
    if (err instanceof WebError_1.WebError) {
        return response.status(err.code).json({
            error: true,
            message: err.message,
        });
    }
    return response.status(500).json({
        error: true,
        message: 'Internal Error',
    });
}
exports.errorHandler = errorHandler;
