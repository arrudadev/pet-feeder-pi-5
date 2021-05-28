import IbmDbConnection from '../database/connection';

import { convertScheduleHourInDateFormat } from '../utils/convertScheduleHourInDateFormat';
import { formatDateInHour } from '../utils/formatDateInHour';

export class FeedModel {
  async create(status, weight) {
    const date = new Date();

    const feedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const feedHour = formatDateInHour(date);

    weight = weight || null;

    const insertFeedSQL = `
      INSERT INTO ${process.env.DB_SCHEMA}.feeds (FEED_DATE, FEED_HOUR, FEED_STATUS, FEED_WEIGHT)
      VALUES('${feedDate}', '${feedHour}', '${status}', ${weight});
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(insertFeedSQL, function (error, data) {
          if (error) {
            throw error;
          }        
        });

        connection.close();

        resolve();
      });
    });
  }

  async find() {
    let feeds = [];

    const selectFeedsSQL = `
      SELECT feed_id, feed_date, feed_hour, feed_status, feed_weight from ${process.env.DB_SCHEMA}.feeds
      where feed_status = 'S'
      order by feed_id desc;
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(selectFeedsSQL, function (error, data) {
          if (error) {
            throw error;
          }
          
          connection.close();

          feeds = data.map(feed => {
            const feedDate = new Date(feed.FEED_DATE);

            feedDate.setDate(feedDate.getDate() + 1);

            return {
              feed_id: feed.FEED_ID,
              feed_date: feedDate,
              feed_hour: convertScheduleHourInDateFormat(feed.FEED_HOUR),
              feed_weight: feed.FEED_WEIGHT,
            }
          });

          resolve();
        });
      });
    });

    return feeds;
  }

  async findLast() {
    let feed = {};

    const selectLastFeedSQL = `
      SELECT feed_id, feed_date, feed_hour, feed_status from ${process.env.DB_SCHEMA}.feeds 
      order by feed_id desc
      limit 1;
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(selectLastFeedSQL, function (error, data) {
          if (error) {
            throw error;
          }
          
          connection.close();

          feed = data[0];

          resolve();
        });
      });
    });

    return feed;
  }

  async findLastByStatus(status) {
    let feed = {};

    const selectLastFeedByStatusSQL = `
      SELECT feed_id, feed_date, feed_hour, feed_status from ${process.env.DB_SCHEMA}.feeds
      where feed_status = '${status}'
      order by feed_id desc
      limit 1;
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(selectLastFeedByStatusSQL, function (error, data) {
          if (error) {
            throw error;
          }
          
          connection.close();

          feed = data[0];

          resolve();
        });
      });
    });

    return feed;
  }

  async update(feedId, weight) {
    weight = weight || null;

    const updateFeedStatusSQL = `
      UPDATE ${process.env.DB_SCHEMA}.feeds SET feed_status = 'S', feed_weight = ${weight}
      WHERE feed_id = ${Number(feedId)};
    `;
  
    await new Promise((resolve) => {
      IbmDbConnection(connection => {
        connection.query(updateFeedStatusSQL, function (error, data) {
          if (error) {
            throw error;
          }
    
          connection.close();

          resolve();
        });
      });
    })
  }
}