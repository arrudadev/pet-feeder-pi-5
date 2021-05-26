import express from 'express';

import packageJson from '../package.json';

import IbmDbConnection from './database/connection';

const routes = express.Router();

routes.get('/info', (request, response) => response.json({ version: packageJson.version }));

routes.post('/schedules', (request, response) => {
  try {
    const { schedule_hour } = request.body;

    const date = new Date(schedule_hour);

    const scheduleHour = `${date.getHours()}:${date.getMinutes()}`;    

    const insertScheduleSQL = `
      INSERT INTO ${process.env.DB_SCHEMA}.schedules (SCHEDULE_HOUR)
      VALUES('${scheduleHour}');
    `;

    const selectInsertedIdSQL = `
      SELECT MAX(schedule_id) schedule_id from ${process.env.DB_SCHEMA}.schedules;
    `;
  
    IbmDbConnection(connection => {
      connection.query(insertScheduleSQL, function (error, data) {
        if (error) {
          return response.status(500).json({ error: error });
        }        
      });

      connection.query(selectInsertedIdSQL, function (error, data) {
        if (error) {
          return response.status(500).json({ error: error });
        }

        connection.close();        

        return response.json({ schedule_id: data[0].SCHEDULE_ID });
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

routes.put('/schedules', (request, response) => {
  try {
    const { schedule_hour, schedule_id } = request.body;

    const date = new Date(schedule_hour);

    const scheduleHour = `${date.getHours()}:${date.getMinutes()}`;  

    const updateScheduleHourSQL = `
      UPDATE ${process.env.DB_SCHEMA}.schedules SET schedule_hour = '${scheduleHour}'
      WHERE schedule_id = ${Number(schedule_id)};
    `;
  
    IbmDbConnection(connection => {
      connection.query(updateScheduleHourSQL, function (error, data) {
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

export { routes };