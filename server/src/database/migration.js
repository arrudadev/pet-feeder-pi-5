import IbmDbConnection from './connection';

const createSchedulesTableSQL = `
  CREATE TABLE ${process.env.DB_SCHEMA}.schedules(
    schedule_id INT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    schedule_hour TIME NOT NULL,
    PRIMARY KEY (schedule_id)
  );
`;

const createFeedsTableSQL = `
  CREATE TABLE ${process.env.DB_SCHEMA}.feeds(
    feed_id INT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    feed_date DATE NOT NULL,
    feed_hour TIME NOT NULL,
    feed_status char NOT NULL,
    PRIMARY KEY (feed_id)
  );
`;

function migrate() {  
  try {
    IbmDbConnection(connection => {
      connection.query(createSchedulesTableSQL, function (error, data) {
        if (error) {
          console.log(error);
        }
      });

      connection.query(createFeedsTableSQL, function (error, data) {
        if (error) {
          console.log(error);
        }
      });

      connection.close();
    });

    console.log('migration finished');
  } catch (error) {
    console.log(error);
  }
}

migrate();