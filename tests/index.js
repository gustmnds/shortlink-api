"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepository_1 = require("../src/repositories/UsersRepository");
async function tests() {
    const result = await UsersRepository_1.userRepository.create({
        name: 'temp',
        email: 'temp@gmail.com',
        password: 'epic_password',
    });
    const user = await UsersRepository_1.userRepository.findById(result.id);
    console.log(user);
}
tests();
