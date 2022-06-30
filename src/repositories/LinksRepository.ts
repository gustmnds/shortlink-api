import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { List } from '../models/list/List';
import { prismaClient } from '../prisma';
import { ListQueryDTO } from '../models/list/dto/ListQueryDTO';
import { CreateLinkDTO, Link, UpdateLinkDTO } from '../models/link';

export class LinkRepository {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
  constructor(private prisma: PrismaClient) {}

  /**
   * Create a link record in links table
   *
   * ```ts
   * const link = 'https://localhost:4000';
   *
   * await usersRepository.create({ link }); // Created Link
   *
   * ```
   * @param create necessary data to create a record in database
   * @param userId id of the user who created the link
   * @returns created link record
   */
  public async createLink({ link }: CreateLinkDTO, userId?: string): Promise<Link> {
    const result = await this.prisma.links.create({
      data: {
        link,
        user_id: userId,
      },
    });

    if (!result) return null;
    return new Link(result);
  }

  /**
   * Update link register in links table
   *
   * ```ts
   * const id = "00000000-0000-0000-0000-000000000000";
   * const link = "https://johndoe.com.br";
   *
   * await LinkRepository.updateLink(id, { link }); //Updated link
   *
   * ```
   *
   * @param id id of link register
   * @param update data to update a record in database
   * @returns updated link record
   */
  public async updateLink(id: number, { link }: UpdateLinkDTO): Promise<Link> {
    const result = await this.prisma.links.update({
      data: { link },
      where: { id },
    });

    if (!result) return null;
    return new Link(result);
  }

  /**
   * Find link register by id
   *
   * ```ts
   * const id = "00000000-0000-0000-0000-000000000000";
   *
   * await LinkRepository.findLinkById(id); //Link register
   *
   * ```
   *
   * @param id id of link register
   * @returns finded link record
   */
  public async findLinkById(id: number): Promise<Link> {
    const result = await this.prisma.links.findUnique({
      where: { id },
    });

    if (!result) return null;
    return new Link(result);
  }

  /**
   * Increase access_count paramter in link register
   *
   * ```ts
   * const id = "00000000-0000-0000-0000-000000000000";
   *
   * await LinkRepository.addLinkCount(id); //Updated link
   * ```
   *
   * @param id id of link register
   * @returns updated link record
   */
  public async addLinkCount(id: number): Promise<Link> {
    try {
      const result = await this.prisma.links.update({
        data: {
          access_count: { increment: 1 },
        },
        where: { id },
      });

      return new Link(result);
    } catch (e) {
      return null;
    }
  }

  /**
   * List all links created by userId
   *
   * ```ts
   * const id = '00000000-0000-0000-0000-000000000000';
   * await LinkRepository.listLink(id, { page: 1, count: 20 }); //List of links
   *
   * ```
   *
   * @param userId id of user who was created links
   * @param list pagination list
   * @returns list of links with data, page, total, count and pages.
   */
  public async listLink(userId: string, { count, page }: ListQueryDTO): Promise<List<Link>> {
    const [total, result] = await this.prisma.$transaction([
      this.prisma.links.count({ where: { user_id: userId } }),
      this.prisma.links.findMany({
        take: count,
        skip: (page - 1) * count,
        where: { user_id: userId },
      }),
    ]);

    return new List(
      plainToInstance(Link, result),
      page,
      total,
      count,
      Math.ceil(total / count),
    );
  }
}

export const linkRepository = new LinkRepository(prismaClient);
