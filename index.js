"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const configs_1 = require("./configs");
function showPort(server) {
    const { port } = server.address();
    console.log(`Listen on port ${port}`);
}
async function main() {
    const server = app_1.app.listen(configs_1.PORT, () => showPort(server));
}
(0, configs_1.checkConfig)().then(main);
