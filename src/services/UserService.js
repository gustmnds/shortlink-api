"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const AuthService_1 = require("./AuthService");
const NotFound_1 = require("../models/errors/NotFound");
const BadRequest_1 = require("../models/errors/BadRequest");
const ValidatorService_1 = require("./ValidatorService");
const configs_1 = require("../configs");
const UsersRepository_1 = require("../repositories/UsersRepository");
class UserService {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
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
    async createUser(data) {
        await ValidatorService_1.ValidatorService.validateObject(data);
        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            throw new BadRequest_1.BadRequestError('This email is already in use');
        }
        return this.userRepository.create(Object.assign(data, {
            password: AuthService_1.AuthService.hashPassword(data.password, configs_1.PASSWORD_SALT),
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
    async updateUser(id, data) {
        await ValidatorService_1.ValidatorService.validateObject(data);
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
    async findUserById(id) {
        if (!ValidatorService_1.ValidatorService.validateUUID(id)) {
            throw new BadRequest_1.BadRequestError('Invalid user id');
        }
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFound_1.NotFoundError('Could not find a user with this id');
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
    async findUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFound_1.NotFoundError('Could not find the user');
        }
        return user;
    }
    async authUser(data, expiresIn = '1d') {
        await ValidatorService_1.ValidatorService.validateObject(data);
        const user = await this.findUserByEmail(data.email);
        if (!ValidatorService_1.ValidatorService.validatePassword(user.password, data.password)) {
            throw new NotFound_1.NotFoundError('Could not find the user');
        }
        return AuthService_1.AuthService.createJWT({ id: user.id }, configs_1.JWT_SECRET, expiresIn);
    }
}
exports.UserService = UserService;
exports.userService = new UserService(UsersRepository_1.userRepository);
