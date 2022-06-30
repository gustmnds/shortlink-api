import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { LoginUserDTO } from '../models/user/dto/LoginUserDTO';
import { userService, UserService } from '../services/UserService';
import { CreateUserDTO, UpdateUserDTO } from '../models/user';

export class UserController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private userService: UserService) {}

  public async authUser(request: Request, response: Response) {
    const authUserDTO = plainToInstance(LoginUserDTO, request.body);
    const token = await this.userService.authUser(authUserDTO, '1d');

    return response.json({ token });
  }

  public async createUser(request: Request, response: Response) {
    const createUserDTO = plainToInstance(CreateUserDTO, request.body);
    const user = await this.userService.createUser(createUserDTO);

    return response.status(201).json(instanceToPlain(user));
  }

  public async updateUser(request: Request, response: Response) {
    const { userId } = request.params;
    const updateUserDTO = plainToInstance(UpdateUserDTO, request.body);
    const user = await this.userService.updateUser(userId, updateUserDTO);

    return response.json(instanceToPlain(user));
  }

  public async findUser(request: Request, response: Response) {
    const { userId } = request.params;
    const user = await this.userService.findUserById(userId);

    return response.json(instanceToPlain(user));
  }
}

export const userController = new UserController(userService);
