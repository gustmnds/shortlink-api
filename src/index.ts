import { Server } from 'http';
import { AddressInfo } from 'net';

import 'dotenv/config';

import { app } from './app';
import { PORT, checkConfig } from './configs';

function showPort(server: Server) {
  const { port } = server.address() as AddressInfo;

  console.log(`Listen on port ${port}`);
}

async function main() {
  const server = app.listen(PORT, () => showPort(server));
}

checkConfig().then(main);
