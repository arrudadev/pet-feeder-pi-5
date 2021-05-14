import express from 'express';

import packageJson from '../package.json';

const routes = express.Router();

routes.get('/info', (request, response) => response.json({ version: packageJson.version }));

export { routes };