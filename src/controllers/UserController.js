"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const class_transformer_1 = require("class-transformer");
const LoginUserDTO_1 = require("../models/user/dto/LoginUserDTO");
const UserService_1 = require("../services/UserService");
const user_1 = require("../models/user");
class UserController {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
    constructor(userService) {
        this.userService = userService;
    }
    async authUser(request, response) {
        const authUserDTO = (0, class_transformer_1.plainToInstance)(LoginUserDTO_1.LoginUserDTO, request.body);
        const token = await this.userService.authUser(authUserDTO, '1d');
        return response.json({ token });
    }
    async createUser(request, response) {
        const createUserDTO = (0, class_transformer_1.plainToInstance)(user_1.CreateUserDTO, request.body);
        const user = await this.userService.createUser(createUserDTO);
        return response.status(201).json((0, class_transformer_1.instanceToPlain)(user));
    }
    async updateUser(request, response) {
        const { userId } = request.params;
        const updateUserDTO = (0, class_transformer_1.plainToInstance)(user_1.UpdateUserDTO, request.body);
        const user = await this.userService.updateUser(userId, updateUserDTO);
        return response.json((0, class_transformer_1.instanceToPlain)(user));
    }
    async findUser(request, response) {
        const { userId } = request.params;
        const user = await this.userService.findUserById(userId);
        return response.json((0, class_transformer_1.instanceToPlain)(user));
    }
}
exports.UserController = UserController;
exports.userController = new UserController(UserService_1.userService);
