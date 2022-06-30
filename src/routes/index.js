"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const link_routes_1 = require("./link.routes");
const user_routes_1 = require("./user.routes");
exports.routes = (0, express_1.Router)();
exports.routes.use('/users', user_routes_1.userRoutes);
exports.routes.use('/u', link_routes_1.linkRoutes);
