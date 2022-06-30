"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkController = exports.LinkController = void 0;
const class_transformer_1 = require("class-transformer");
const OpenLinkDTO_1 = require("../models/link/dto/OpenLinkDTO");
const ListQueryDTO_1 = require("../models/list/dto/ListQueryDTO");
const LinkService_1 = require("../services/LinkService");
const link_1 = require("../models/link");
class LinkController {
    // eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function, no-shadow
    constructor(linkService) {
        this.linkService = linkService;
    }
    async createLink(request, response) {
        var _a;
        const createLinkDTO = (0, class_transformer_1.plainToInstance)(link_1.CreateLinkDTO, request.body);
        const link = await this.linkService.createLink(createLinkDTO, (_a = request.user) === null || _a === void 0 ? void 0 : _a.id);
        return response.status(201).json((0, class_transformer_1.instanceToPlain)(link));
    }
    async updateLink(request, response) {
        var _a;
        const openLinkDTO = (0, class_transformer_1.plainToInstance)(OpenLinkDTO_1.OpenLinkDTO, request.params);
        const updateLinkDTO = (0, class_transformer_1.plainToInstance)(link_1.UpdateLinkDTO, request.body);
        const link = await this.linkService.updateLink((_a = request.user) === null || _a === void 0 ? void 0 : _a.id, openLinkDTO, updateLinkDTO);
        return response.json((0, class_transformer_1.instanceToPlain)(link));
    }
    async listLink(request, response) {
        var _a;
        const listQueryDTO = (0, class_transformer_1.plainToInstance)(ListQueryDTO_1.ListQueryDTO, request.query);
        const links = await this.linkService.listLink((_a = request.user) === null || _a === void 0 ? void 0 : _a.id, listQueryDTO);
        return response.json((0, class_transformer_1.instanceToPlain)(links));
    }
    async openLink(request, response) {
        const openLinkDTO = (0, class_transformer_1.plainToInstance)(OpenLinkDTO_1.OpenLinkDTO, request.params);
        const link = await this.linkService.openLink(openLinkDTO);
        return response.redirect(link);
    }
}
exports.LinkController = LinkController;
exports.linkController = new LinkController(LinkService_1.linkService);
