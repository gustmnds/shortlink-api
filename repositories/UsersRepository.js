"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const prisma_1 = require("../prisma");
const user_1 = require("../models/user");
class UserRepository {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Create a user record in users table
     *
     * ```ts
     * const name = 'john';
     * const email = 'john@gmail.com';
     * const password = 'john_doe_password';
     *
     * await usersRepository.create({ name, email, password }); // User Created
     *
     * ```
     * @param user necessary data to create a record in database, being the name, email and password
     * @returns created user record
     */
    async create({ name, email, password }) {
        const result = await this.prisma.users.create({
            data: {
                name,
                email,
                password,
            },
        });
        if (!result)
            return null;
        return new user_1.User(result);
    }
    /**
     * Update user record in users table
     *
     * ```ts
     * const id = '00000000-0000-0000-0000-000000000000';
     * const name = 'john doe';
     *
     * await usersRepository.update(id, { name }); //Update user name
     * ```
     *
     * @param id user id
     * @param user params to update in users table
     * @returns updated user record
     */
    async update(id, { name, email, password }) {
        const result = await this.prisma.users.update({
            data: {
                name,
                email,
                password,
            },
            where: { id },
        });
        if (!result)
            return null;
        return new user_1.User(result);
    }
    /**
     * Find user record by register id
     *
     * ```ts
     * const id = '00000000-0000-0000-0000-000000000000'
     *
     * await userRepository.findById(id); //user with id 00000000-0000-0000-0000-000000000000
     * ```
     *
     * @param id user id
     * @returns user record if they exists
     */
    async findById(id) {
        const result = await this.prisma.users.findUnique({
            where: { id },
        });
        if (!result)
            return null;
        return new user_1.User(result);
    }
    /**
     * Find user record by register email
     *
     * ```ts
     * const email = 'john@gmail.com'
     *
     * await userRepository.findByEmail(email); //user with email john@gmail.com
     * ```
     *
     * @param email user email
     * @returns user record if they exists
     */
    async findByEmail(email) {
        const result = await this.prisma.users.findUnique({
            where: { email },
        });
        if (!result)
            return null;
        return new user_1.User(result);
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository(prisma_1.prismaClient);
