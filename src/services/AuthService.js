"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    /**
    * Hash an password with bcrypt algorithm
    *
    * ```ts
    * const result = AuthService.hashPassword('johndoe_password', '$2a$10$0RgRJFwPUf7qUCkkSrhzu.');
    * console.log(result) // $2a$10$0RgRJFwPUf7qUCkkSrhzu.6n0R50oL39rl2f206p3N/gnIneLMjCC
    * ```
    *
    * @param password raw password to hash
    * @param salt bcrypt salt
    * @returns hashed password by bcrypt
    */
    static hashPassword(password, salt) {
        return bcryptjs_1.default.hashSync(password, salt);
    }
    /**
    * Create json web token
    *
    * ```ts
    * const payload = { "name": "John doe" };
    * const key = 'cc2a3385c48370d686da2dfafd8ea0cd358db03d9c89ad81fec2026c92315ea5';
    * const result = AuthService.createJWT(payload, key);
    *
    * console.log(result);
    *
    * //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    * //eyJuYW1lIjoiSm9obiBkb2UifQ.
    * //NkIj-4OYddj7zfHJi55uu-K6Zin2qzfb2TID2oLRLkw
    * ```
    *
    * @param payload data to put into json web token
    * @param key key to sign json web token
    * @param expiresIn time to json web token expires
    * @param algorithm algorithm used to sign json web token
    * @returns json web token created from payload, signed with key using specified algorithm
    * and expires after expiresIn if informed
    */
    static createJWT(payload, key, expiresIn, algorithm = 'HS256') {
        return jsonwebtoken_1.default.sign(payload, key, {
            expiresIn,
            algorithm,
        });
    }
}
exports.AuthService = AuthService;
