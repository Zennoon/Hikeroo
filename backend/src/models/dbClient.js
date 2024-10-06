import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME || 'hikeroo_db';

class DBClient {
  constructor() {
    this.db = mongoose.createConnection(`mongodb://127.0.0.1:27017/${DB_NAME}`);

    this.db.on('connected', () => {
      console.log('DB is connected...');
    });
  }
}

const dbClient = new DBClient();
export default dbClient;
