"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = void 0;
const class_transformer_1 = require("class-transformer");
const configs_1 = require("../configs");
const user_1 = require("../models/user");
const ValidatorService_1 = require("../services/ValidatorService");
const Unauthorized_1 = require("../models/errors/Unauthorized");
/**
 * Check if user is authenticated
 *
 * ```
 * router.get('/request', authHandler(true), controller.handler) // required
 * router.get('/request', authHandler(false), controller.handler) // optional
 * ```
 * @param required authentication is required
 * @returns function to be called by router to verify if user is validated
 */
function authHandler(required = true) {
    return function authCheck(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            if (required) {
                throw new Unauthorized_1.UnauthorizedError('Missing Authentication header');
            }
            return next();
        }
        const [prefix, token] = authHeader.split(' ');
        if (prefix.toLowerCase().trim() !== 'bearer') {
            throw new Unauthorized_1.UnauthorizedError('Only bearer authentication is valid');
        }
        const payload = ValidatorService_1.ValidatorService.validateJWT(token, configs_1.JWT_SECRET);
        if (!payload) {
            if (required) {
                throw new Unauthorized_1.UnauthorizedError('Invalid Authentication header');
            }
            return next();
        }
        req.user = (0, class_transformer_1.plainToInstance)(user_1.AuthUserDTO, payload, { excludeExtraneousValues: true });
        return next();
    };
}
exports.authHandler = authHandler;
