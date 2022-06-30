import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export class AuthService {
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
  public static hashPassword(password: string, salt: string): string {
    return bcrypt.hashSync(password, salt);
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
  public static createJWT<T extends object | string>(
    payload: T,
    key: string,
    expiresIn?: string,
    algorithm: JWT.Algorithm = 'HS256',
  ): string {
    return JWT.sign(payload, key, {
      expiresIn,
      algorithm,
    });
  }
}
