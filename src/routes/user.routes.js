"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post('/', UserController_1.userController.createUser.bind(UserController_1.userController));
exports.userRoutes.post('/auth', UserController_1.userController.authUser.bind(UserController_1.userController));
exports.userRoutes.get('/:userId', UserController_1.userController.findUser.bind(UserController_1.userController));
exports.userRoutes.patch('/:userId', UserController_1.userController.updateUser.bind(UserController_1.userController));
