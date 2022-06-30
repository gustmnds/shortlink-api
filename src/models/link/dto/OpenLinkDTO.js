"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenLinkDTO = void 0;
const class_transformer_1 = require("class-transformer");
const TrasformService_1 = require("../../../services/TrasformService");
class OpenLinkDTO {
}
__decorate([
    (0, class_transformer_1.Transform)((param) => TrasformService_1.TransformService.Base64ToNumber(param.value), { toClassOnly: true })
], OpenLinkDTO.prototype, "linkId", void 0);
exports.OpenLinkDTO = OpenLinkDTO;
