"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkRepository = exports.LinkRepository = void 0;
const class_transformer_1 = require("class-transformer");
const List_1 = require("../models/list/List");
const prisma_1 = require("../prisma");
const link_1 = require("../models/link");
class LinkRepository {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
    constructor(prisma) {
        this.prisma = prisma;
    }
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
    async createLink({ link }, userId) {
        const result = await this.prisma.links.create({
            data: {
                link,
                user_id: userId,
            },
        });
        if (!result)
            return null;
        return new link_1.Link(result);
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
    async updateLink(id, { link }) {
        const result = await this.prisma.links.update({
            data: { link },
            where: { id },
        });
        if (!result)
            return null;
        return new link_1.Link(result);
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
    async findLinkById(id) {
        const result = await this.prisma.links.findUnique({
            where: { id },
        });
        if (!result)
            return null;
        return new link_1.Link(result);
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
    async addLinkCount(id) {
        try {
            const result = await this.prisma.links.update({
                data: {
                    access_count: { increment: 1 },
                },
                where: { id },
            });
            return new link_1.Link(result);
        }
        catch (e) {
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
    async listLink(userId, { count, page }) {
        const [total, result] = await this.prisma.$transaction([
            this.prisma.links.count({ where: { user_id: userId } }),
            this.prisma.links.findMany({
                take: count,
                skip: (page - 1) * count,
                where: { user_id: userId },
            }),
        ]);
        return new List_1.List((0, class_transformer_1.plainToInstance)(link_1.Link, result), page, total, count, Math.ceil(total / count));
    }
}
exports.LinkRepository = LinkRepository;
exports.linkRepository = new LinkRepository(prisma_1.prismaClient);
