import * as UUID from 'uuid';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as classValidator from 'class-validator';

import { BadRequestError } from '../models/errors/BadRequest';

export class ValidatorService {
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
  public static async validateObject(...objects: Object[]) {
    const validate = async (object) => {
      const result = await classValidator.validate(object);
      if (result.length > 0) {
        // Get first error
        const error = result.shift();
        throw new BadRequestError(`Invalid paramter ${error.property}`);
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
  public static validateUUID(uuid: string): boolean {
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
  public static validatePassword(hash: string, password: string): boolean {
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
  public static validateJWT<T>(jwt: string, secret: string): T | null {
    try {
      return JWT.verify(jwt, secret) as T;
    } catch (e) {
      return null;
    }
  }
}
