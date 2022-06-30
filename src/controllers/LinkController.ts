import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { OpenLinkDTO } from '../models/link/dto/OpenLinkDTO';
import { ListQueryDTO } from '../models/list/dto/ListQueryDTO';
import { linkService, LinkService } from '../services/LinkService';
import { CreateLinkDTO, UpdateLinkDTO } from '../models/link';

export class LinkController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private linkService: LinkService) {}

  public async createLink(request: Request, response: Response) {
    const createLinkDTO = plainToInstance(CreateLinkDTO, request.body);
    const link = await this.linkService.createLink(createLinkDTO, request.user?.id);

    return response.status(201).json(instanceToPlain(link));
  }

  public async updateLink(request: Request, response: Response) {
    const openLinkDTO = plainToInstance(OpenLinkDTO, request.params);
    const updateLinkDTO = plainToInstance(UpdateLinkDTO, request.body);
    const link = await this.linkService.updateLink(request.user?.id, openLinkDTO, updateLinkDTO);

    return response.json(instanceToPlain(link));
  }

  public async listLink(request: Request, response: Response) {
    const listQueryDTO = plainToInstance(ListQueryDTO, request.query);
    const links = await this.linkService.listLink(request.user?.id, listQueryDTO);

    return response.json(instanceToPlain(links));
  }

  public async openLink(request: Request, response: Response) {
    const openLinkDTO = plainToInstance(OpenLinkDTO, request.params);
    const link = await this.linkService.openLink(openLinkDTO);

    return response.redirect(link);
  }
}

export const linkController = new LinkController(linkService);
