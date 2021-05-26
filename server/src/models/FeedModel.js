import IbmDbConnection from '../database/connection';

export class FeedModel {
  async create(status) {
    const date = new Date();

    const feedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const feedHour = `${date.getHours()}:${date.getMinutes()}`;

    const insertFeedSQL = `
      INSERT INTO ${process.env.DB_SCHEMA}.feeds (FEED_DATE, FEED_HOUR, FEED_STATUS)
      VALUES('${feedDate}', '${feedHour}', '${status}');
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
}