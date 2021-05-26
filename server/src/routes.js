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
      INSERT INTO ${process.env.DB_SCHEMA}.schedules (SCHEDULE_HOUR)
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
    response.status(500).json({ error: error });
  }
});

routes.get('/schedules', (request, response) => {
  try {
    const selectSchedulesSQL = `
      SELECT schedule_id, schedule_hour from ${process.env.DB_SCHEMA}.schedules 
      order by schedule_hour
      limit 3;
    `;

    function convertScheduleHourInDateFormat(scheduleHour) {
      const [hour, minutes] = scheduleHour.split(':');

      const date = new Date();

      date.setHours(hour);
      date.setMinutes(minutes);

      return date;
    }
  
    IbmDbConnection(connection => {
      connection.query(selectSchedulesSQL, function (error, data) {
        if (error) {
          return response.status(500).json({ error: error });
        }
  
        connection.close();
  
        return response.json({ 
          schedules: data.map(schedule => {
            return {
              schedule_id: schedule.SCHEDULE_ID,
              schedule_hour: convertScheduleHourInDateFormat(schedule.SCHEDULE_HOUR)
            }
          }) 
        });
      });
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
});

export { routes };