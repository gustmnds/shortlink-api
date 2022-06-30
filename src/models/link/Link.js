"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TrasformService_1 = require("../../services/TrasformService");
class Link {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, class_transformer_1.Transform)((param) => TrasformService_1.TransformService.NumberToBase64(param.value), { toPlainOnly: true })
], Link.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsUrl)()
], Link.prototype, "link", void 0);
exports.Link = Link;
