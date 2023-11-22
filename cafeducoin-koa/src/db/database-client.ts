import { Client } from "pg";
import config from "./config";

class DatabaseClient {
	private client: Client;

	constructor() {
		console.log(JSON.stringify(config));
		const { user, password, database, port, host } = config;
		this.client = new Client({
			user,
			password,
			database,
			port,
			host,
		});
	}

	public connectToDatabase(): Promise<void> {
		return this.client.connect().then(() => {
			console.log("Database connection OK !");
		}).catch(err => {
			console.error(err);
		});
	}

	public getDatabaseClient() {
		return this.client;
	}
}

export default new DatabaseClient();
