import express from 'express';

import packageJson from '../package.json';

import IbmDbConnection from './database/connection';

import { ScheduleController } from './controllers/ScheduleController'

const routes = express.Router();

routes.get('/info', (request, response) => response.json({ version: packageJson.version }));

routes.post('/schedules', new ScheduleController().handleCreateSchedule);

routes.get('/schedules', new ScheduleController().handleFindSchedules);

routes.put('/schedules', new ScheduleController().handleUpdateSchedule);

routes.delete('/schedules', new ScheduleController().handleDeleteSchedule);

export { routes };