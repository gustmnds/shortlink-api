"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorService = void 0;
const UUID = __importStar(require("uuid"));
const JWT = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const classValidator = __importStar(require("class-validator"));
const BadRequest_1 = require("../models/errors/BadRequest");
class ValidatorService {
    /**
     *  User class-validator to validate the object
     *  if the object is invalid, the function throws BadRequest Error
     *
     * ```ts
     * const validClassEmail = new ValidClass();
     * const invalidClassEmail = new InvalidClassEmail();
     *
     * ValidatorService.validateObject(validClassEmail) // nothing happens
     * ValidatorService.validateObject(invalidClassEmail) // 400 - Invalid paramter email
     * ValidatorService.validateObject(
     *    validClassEmail,
     *    invalidClassEmail
     * ) // 400 - Invalid paramter email
     * ```
     * @param objects objects to pass in class-validator validate
     */
    static async validateObject(...objects) {
        const validate = async (object) => {
            const result = await classValidator.validate(object);
            if (result.length > 0) {
                // Get first error
                const error = result.shift();
                throw new BadRequest_1.BadRequestError(`Invalid paramter ${error.property}`);
            }
        };
        await Promise.all(objects.map(validate));
    }
    /**
     * Check if uuid is a valid uuid
     *
     * ```ts
     * ValidatorService.validateUUID('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b') // true
     * ValidatorService.validateUUID('hello') // false
     * ```
     *
     * @param uuid uuid to validate
     * @returns uuid is or not a valid uuid structure
     */
    static validateUUID(uuid) {
        return UUID.validate(uuid);
    }
    /**
     * Check if password is equivalent to bcrypt hashed password
     *
     * ```ts
     * const hash = '$2a$10$0RgRJFwPUf7qUCkkSrhzu.6n0R50oL39rl2f206p3N/gnIneLMjCC';
     *
     * ValidatorService.validatePassword(hash, 'johndoe_password') // true
     * ValidatorService.validatePassword(hash, 'john_password') // false
     * ```
     *
     * @param hash hashed password by bcrypt
     * @param password raw password to compare
     * @returns password is or not equivalent to hashed password
     */
    static validatePassword(hash, password) {
        return bcrypt.compareSync(password, hash);
    }
    /**
     * check and get informations from json web token
     *
     * ```ts
     * const secret = 'cc2a3385c48370d686da2dfafd8ea0cd358db03d9c89ad81fec2026c92315ea5';
     * const token = `
     *        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
     *        eyJuYW1lIjoiSm9obiBkb2UifQ.
     *        NkIj-4OYddj7zfHJi55uu-K6Zin2qzfb2TID2oLRLkw
     * `;
     *
     * const result = ValidatorService.validateJWT<Object>(token, secret);
     * console.log(result); // { "name": "John doe" }
     * ```
     *
     * @param jwt json web token to get infomations
     * @param secret secret key used to sign token
     * @returns if jwt is a valid token signed by secret returns de object specified in T
     * otherwise returns null
     */
    static validateJWT(jwt, secret) {
        try {
            return JWT.verify(jwt, secret);
        }
        catch (e) {
            return null;
        }
    }
}
exports.ValidatorService = ValidatorService;
