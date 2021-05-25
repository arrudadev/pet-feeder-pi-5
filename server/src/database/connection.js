import ibmdb from 'ibm_db';

require('dotenv').config();

const connectionString = `DATABASE=${process.env.DB_DATABASE};HOSTNAME=${process.env.DB_HOSTNAME};PORT=${process.env.DB_PORT};PROTOCOL=TCPIP;UID=${process.env.DB_UID};PWD=${process.env.DB_PWD};`;

export default function IbmDbConnection(callback) {
  ibmdb.open(connectionString, function (error, connection) {
    if (error) {
      console.log(error);
      throw error;
    }

    callback(connection);
  });
}
