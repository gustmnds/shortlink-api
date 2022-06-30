import { List } from '../models/list/List';
import { OpenLinkDTO } from '../models/link/dto/OpenLinkDTO';
import { ListQueryDTO } from '../models/list/dto/ListQueryDTO';
import { NotFoundError } from '../models/errors/NotFound';
import { ForbiddenError } from '../models/errors/Forbidden';
import { BadRequestError } from '../models/errors/BadRequest';
import { ValidatorService } from './ValidatorService';
import { linkRepository, LinkRepository } from '../repositories/LinksRepository';
import { CreateLinkDTO, Link, UpdateLinkDTO } from '../models/link';

export class LinkService {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
  constructor(private readonly linkRepository: LinkRepository) {}

  /**
   * Create a link record in links table if the params are valid
   *
   * ```ts
   * const link = 'https://localhost:4000';
   *
   * await usersRepository.create({ link }); // Created Link
   *
   * ```
   * @param data necessary data to create a record in database, being the link
   * @param userId id of the user who created the link
   * @returns created link record
   */
  public async createLink(data: CreateLinkDTO, userId?: string): Promise<Link> {
    await ValidatorService.validateObject(data);
    if (userId && !ValidatorService.validateUUID(userId)) {
      throw new BadRequestError('Invalid user id');
    }

    return this.linkRepository.createLink(data, userId);
  }

  /**
   * Create a link record in links table if the params are valid
   *
   * ```ts
   * const link = 'https://john.doe/';
   *
   * await usersRepository.create({ link }); // Created Link
   *
   * ```
   * @param data necessary data to create a record in database, being the link
   * @param userId id of the user who created the link
   * @returns created link record
   */
  public async updateLink(userId: string, open: OpenLinkDTO, update: UpdateLinkDTO): Promise<Link> {
    await ValidatorService.validateObject(open, update);
    if (!ValidatorService.validateUUID(userId)) {
      throw new BadRequestError('Invalid user id');
    }

    const link = await this.linkRepository.findLinkById(open.linkId);
    if (!link || link.users_id !== userId) {
      throw new ForbiddenError("you don't have permission to edit this link");
    }

    return this.linkRepository.updateLink(open.linkId, update);
  }

  /**
   * List all links created by userId if the params are valid
   *
   * ```ts
   * const id = '00000000-0000-0000-0000-000000000000';
   * const result = LinkService.listLink(id, { page: 1, count: 20 });
   * ```
   * @param userId id of user who was created links
   * @param list pagination list
   * @returns list of links with data, page, total, count and pages.
   */
  public async listLink(userId: string, list: ListQueryDTO): Promise<List<Link>> {
    await ValidatorService.validateObject(list);
    if (!ValidatorService.validateUUID(userId)) {
      throw new BadRequestError('Invalid user id');
    }

    return this.linkRepository.listLink(userId, list);
  }

  /**
   * Find link in links repository increase access count and return unshorted link if exists
   *
   * ```ts
   * const linkId = 1;
   * await LinkService.openLink({ linkId }); // https://john.doe/
   * ```
   * @param open link id to find
   * @returns unshorted link
   */
  public async openLink(open: OpenLinkDTO): Promise<string> {
    await ValidatorService.validateObject(open);
    if (!open.linkId) {
      throw new NotFoundError('Link not found');
    }

    const link = await this.linkRepository.addLinkCount(open.linkId);
    if (!link) {
      throw new NotFoundError('Link not found');
    }

    return link.link;
  }
}

export const linkService = new LinkService(linkRepository);
