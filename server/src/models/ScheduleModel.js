import IbmDbConnection from '../database/connection';

import { convertScheduleHourInDateFormat } from '../utils/convertScheduleHourInDateFormat';
import { formatDateInHour } from '../utils/formatDateInHour';

export class ScheduleModel {
  async create(scheduleHour) {
    let scheduleId = 0;

    const date = new Date(scheduleHour);

    const scheduleHourFormated = formatDateInHour(date);    

    const insertScheduleSQL = `
      INSERT INTO ${process.env.DB_SCHEMA}.schedules (SCHEDULE_HOUR)
      VALUES('${scheduleHourFormated}');
    `;

    const selectInsertedIdSQL = `
      SELECT MAX(schedule_id) schedule_id from ${process.env.DB_SCHEMA}.schedules;
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(insertScheduleSQL, function (error, data) {
          if (error) {
            throw error;
          }        
        });
  
        connection.query(selectInsertedIdSQL, function (error, data) {
          if (error) {
            throw error;
          }
  
          connection.close();
  
          scheduleId = data[0].SCHEDULE_ID;

          resolve();
        });
      });
    });

    return scheduleId;
  }

  async find() {
    let schedules = [];

    const selectSchedulesSQL = `
      SELECT schedule_id, schedule_hour from ${process.env.DB_SCHEMA}.schedules 
      order by schedule_hour
      limit 3;
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(selectSchedulesSQL, function (error, data) {
          if (error) {
            throw error;
          }
    
          connection.close();
    
          schedules = data.map(schedule => {
            return {
              schedule_id: schedule.SCHEDULE_ID,
              schedule_hour: convertScheduleHourInDateFormat(schedule.SCHEDULE_HOUR)
            }
          });

          resolve();
        });
      });
    });

    return schedules;
  }

  async update(scheduleHour, scheduleId) {
    const date = new Date(scheduleHour);

    const scheduleHourFormated = formatDateInHour(date);  

    const updateScheduleHourSQL = `
      UPDATE ${process.env.DB_SCHEMA}.schedules SET schedule_hour = '${scheduleHourFormated}'
      WHERE schedule_id = ${Number(scheduleId)};
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(updateScheduleHourSQL, function (error, data) {
          if (error) {
            throw error;
          }
    
          connection.close();

          resolve();
        });
      });
    })
  }

  async delete(scheduleId) {
    const deleteScheduleSQL = `
      DELETE FROM ${process.env.DB_SCHEMA}.schedules WHERE schedule_id = ${Number(scheduleId)};
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(deleteScheduleSQL, function (error, data) {
          if (error) {
            throw error;
          }
    
          connection.close();
    
          resolve();
        });
      });
    });
  }
}