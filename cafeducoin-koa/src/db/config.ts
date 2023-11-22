import { IDbConfig } from "./database.interface";

const config: IDbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT)
};
export default config;

