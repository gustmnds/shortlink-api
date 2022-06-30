import {
  User,
  LoginUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from '../models/user';
import { AuthService } from './AuthService';
import { NotFoundError } from '../models/errors/NotFound';
import { BadRequestError } from '../models/errors/BadRequest';
import { ValidatorService } from './ValidatorService';
import { JWT_SECRET, PASSWORD_SALT } from '../configs';
import { userRepository, UserRepository } from '../repositories/UsersRepository';

export class UserService {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create a user record in users table if the params are valid
   *
   * ```ts
   * const name = 'john';
   * const email = 'john@gmail.com';
   * const password = 'john_doe_password';
   *
   * await UserService.createUser({ name, email, password }); // User created
   * ```
   *
   * @param user necessary data to create a record in database, being the name, email and password
   * @returns created user record
   */
  public async createUser(data: CreateUserDTO): Promise<User> {
    await ValidatorService.validateObject(data);

    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new BadRequestError('This email is already in use');
    }

    return this.userRepository.create(Object.assign(data, {
      password: AuthService.hashPassword(data.password, PASSWORD_SALT),
    }));
  }

  /**
   * Update a user record in users table by id
   *
   * ```ts
   *  const id = '00000000-0000-0000-0000-000000000000';
   *  const email = 'johndoe@gmail.com';
   *
   *  await UserService.updateUser(id, { email }) // Updated user
   * ```
   *
   * @param user necessary data to update a record in database, being the name, email and password
   * @returns updated user record
   */
  public async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    await ValidatorService.validateObject(data);
    await this.findUserById(id);

    return this.userRepository.update(id, data);
  }

  /**
   * Find user by id
   *
   * ```ts
   *
   * const id = '00000000-0000-0000-0000-000000000000'
   *
   * await UserService.findUserById(id) // Finded User
   * ```
   *
   * @param id User id to find in database users table
   * @returns User record
   */
  public async findUserById(id: string): Promise<User> {
    if (!ValidatorService.validateUUID(id)) {
      throw new BadRequestError('Invalid user id');
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('Could not find a user with this id');
    }

    return user;
  }

  /**
   * Find user by email
   *
   * ```ts
   *
   * const id = 'john@gmail.com'
   *
   * await UserService.findUserByEmail(id) // Finded User
   * ```
   *
   * @param email User email to find in database users table
   * @returns User record
   */
  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Could not find the user');
    }

    return user;
  }

  public async authUser(data: LoginUserDTO, expiresIn: string = '1d'): Promise<string> {
    await ValidatorService.validateObject(data);
    const user = await this.findUserByEmail(data.email);

    if (!ValidatorService.validatePassword(user.password, data.password)) {
      throw new NotFoundError('Could not find the user');
    }

    return AuthService.createJWT({ id: user.id }, JWT_SECRET, expiresIn);
  }
}

export const userService = new UserService(userRepository);
