import 'express-async-errors';
import express from 'express';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Setup api basic information
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export { app };
