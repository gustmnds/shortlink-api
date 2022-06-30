import { Router } from 'express';

import { authHandler } from '../middlewares/authHandler';
import { linkController } from '../controllers/LinkController';

export const linkRoutes = Router();

linkRoutes.post('/', authHandler(false), linkController.createLink.bind(linkController));
linkRoutes.get('/', authHandler(true), linkController.listLink.bind(linkController));
linkRoutes.get('/:linkId', authHandler(false), linkController.openLink.bind(linkController));
linkRoutes.get('/:linkId', authHandler(false), linkController.openLink.bind(linkController));
