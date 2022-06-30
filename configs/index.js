"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.PASSWORD_SALT = exports.JWT_SECRET = exports.checkConfig = void 0;
const class_transformer_1 = require("class-transformer");
const config_1 = require("../models/configs/config");
const ValidatorService_1 = require("../services/ValidatorService");
const Configs = (0, class_transformer_1.plainToInstance)(config_1.Config, process.env);
async function checkConfig() {
    try {
        await ValidatorService_1.ValidatorService.validateObject(Configs);
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}
exports.checkConfig = checkConfig;
exports.JWT_SECRET = Configs.JWT_SECRET, exports.PASSWORD_SALT = Configs.PASSWORD_SALT, exports.PORT = Configs.PORT;
