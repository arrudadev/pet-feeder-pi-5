import express from 'express';

import packageJson from '../package.json';

import IbmDbConnection from './database/connection';

const routes = express.Router();

routes.get('/info', (request, response) => response.json({ version: packageJson.version }));

routes.post('/schedules', (request, response) => {
  try {
    const { schedule_hour } = request.body;

    const date = new Date(schedule_hour);

    const time = `${date.getHours()}:${date.getMinutes()}`;    

    const insertScheduleSQL = `
      INSERT INTO ${process.env.DB_SCHEMA}.SCHEDULES (SCHEDULE_HOUR)
      VALUES('${time}');
    `;
  
    IbmDbConnection(connection => {
      connection.query(insertScheduleSQL, function (error, data) {
        if (error) {
          return response.status(500).json({ error: error });
        }
  
        connection.close();
  
        return response.json({ success: true });
      });
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({error: error});
  }
});

export { routes };