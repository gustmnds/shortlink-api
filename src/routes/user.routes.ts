import { Router } from 'express';

import { userController } from '../controllers/UserController';

export const userRoutes = Router();

userRoutes.post('/', userController.createUser.bind(userController));
userRoutes.post('/auth', userController.authUser.bind(userController));
userRoutes.get('/:userId', userController.findUser.bind(userController));
userRoutes.patch('/:userId', userController.updateUser.bind(userController));
