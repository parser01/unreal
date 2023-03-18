import { Db, MongoClient } from "mongodb";

const DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;

const client = new MongoClient(DB_URL);

const DB_NAME = process.env.DB_NAME;
let db: Db;

class ServerDb {
	async connectToDb() {
		try {
			const conn = await client.connect();
			db = conn.db(DB_NAME);
		} catch (error) {
			throw error;
		}
	}

	getDb() {
		return db;
	}
}

export default new ServerDb();
