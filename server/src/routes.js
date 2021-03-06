import express from 'express';

import packageJson from '../package.json';

import IbmDbConnection from './database/connection';

import { ScheduleController } from './controllers/ScheduleController'
import { FeedController } from './controllers/FeedController'

const routes = express.Router();

routes.get('/info', (request, response) => response.json({ version: packageJson.version }));

routes.get('/members', (request, response) => response.json({ 
  grupo: 'GRUPO 03', 
  members: [
    { name: 'Alexandre Monteiro' },
    { name: 'David Nascimento' },
    { name: 'Felipe Timoti' },
    { name: 'Gian Carlos' },
  ] 
}));

routes.post('/schedules', new ScheduleController().handleCreateSchedule);

routes.get('/schedules', new ScheduleController().handleFindSchedules);

routes.put('/schedules', new ScheduleController().handleUpdateSchedule);

routes.delete('/schedules', new ScheduleController().handleDeleteSchedule);

routes.post('/feeds', new FeedController().handleCreateFeed);

routes.put('/feeds', new FeedController().handleUpdateFeed);

routes.get('/feeds', new FeedController().handleFindAllFeeds);

routes.get('/feeds/verify', new FeedController().handleVerifyNeedFeed);

routes.get('/feeds/last', new FeedController().handleFindLastFeed);

export { routes };