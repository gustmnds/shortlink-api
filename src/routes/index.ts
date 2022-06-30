import { Router } from 'express';

import { linkRoutes } from './link.routes';
import { userRoutes } from './user.routes';

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/u', linkRoutes);
