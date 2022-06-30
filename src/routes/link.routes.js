"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkRoutes = void 0;
const express_1 = require("express");
const authHandler_1 = require("../middlewares/authHandler");
const LinkController_1 = require("../controllers/LinkController");
exports.linkRoutes = (0, express_1.Router)();
exports.linkRoutes.post('/', (0, authHandler_1.authHandler)(false), LinkController_1.linkController.createLink.bind(LinkController_1.linkController));
exports.linkRoutes.get('/', (0, authHandler_1.authHandler)(true), LinkController_1.linkController.listLink.bind(LinkController_1.linkController));
exports.linkRoutes.get('/:linkId', (0, authHandler_1.authHandler)(false), LinkController_1.linkController.openLink.bind(LinkController_1.linkController));
exports.linkRoutes.get('/:linkId', (0, authHandler_1.authHandler)(false), LinkController_1.linkController.openLink.bind(LinkController_1.linkController));