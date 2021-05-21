import express from 'express';

import packageJson from '../package.json';

const routes = express.Router();

const feedInfo = {
  status: 'NO_FEED',
  times: []
}

routes.get('/info', (request, response) => response.json({ version: packageJson.version }));

routes.get('/feed', (request, response) => response.json({ feed: feedInfo.status }));

routes.put('/feed', (request, response) => {
  const status = feedInfo.status;

  if (status === 'NO_FEED') {
    feedInfo.status = 'FEED_NOW';

    setTimeout(() => {
      feedInfo.status = 'NO_FEED';
    }, 2000);
  }

  response.json({ ok: true });
});

export { routes };