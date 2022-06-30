"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkService = exports.LinkService = void 0;
const NotFound_1 = require("../models/errors/NotFound");
const Forbidden_1 = require("../models/errors/Forbidden");
const BadRequest_1 = require("../models/errors/BadRequest");
const ValidatorService_1 = require("./ValidatorService");
const LinksRepository_1 = require("../repositories/LinksRepository");
class LinkService {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
    constructor(linkRepository) {
        this.linkRepository = linkRepository;
    }
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
    async createLink(data, userId) {
        await ValidatorService_1.ValidatorService.validateObject(data);
        if (userId && !ValidatorService_1.ValidatorService.validateUUID(userId)) {
            throw new BadRequest_1.BadRequestError('Invalid user id');
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
    async updateLink(userId, open, update) {
        await ValidatorService_1.ValidatorService.validateObject(open, update);
        if (!ValidatorService_1.ValidatorService.validateUUID(userId)) {
            throw new BadRequest_1.BadRequestError('Invalid user id');
        }
        const link = await this.linkRepository.findLinkById(open.linkId);
        if (!link || link.users_id !== userId) {
            throw new Forbidden_1.ForbiddenError("you don't have permission to edit this link");
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
    async listLink(userId, list) {
        await ValidatorService_1.ValidatorService.validateObject(list);
        if (!ValidatorService_1.ValidatorService.validateUUID(userId)) {
            throw new BadRequest_1.BadRequestError('Invalid user id');
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
    async openLink(open) {
        await ValidatorService_1.ValidatorService.validateObject(open);
        if (!open.linkId) {
            throw new NotFound_1.NotFoundError('Link not found');
        }
        const link = await this.linkRepository.addLinkCount(open.linkId);
        if (!link) {
            throw new NotFound_1.NotFoundError('Link not found');
        }
        return link.link;
    }
}
exports.LinkService = LinkService;
exports.linkService = new LinkService(LinksRepository_1.linkRepository);
