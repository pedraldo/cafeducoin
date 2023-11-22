import { DefaultContext } from "koa";
import dbClient from '../db/database-client';
import gamesQueries from "../db/queries/games.queries";

const client = dbClient.getDatabaseClient();

const getGames = async (context: DefaultContext) => {
	try {
		const result = await client.query(gamesQueries.getGames());
		console.log(`Games query result : ${JSON.stringify(result.rows)}`);
		context.status = 200;
		context.body = result.rows;
	} catch(error) {
		console.error(error);
	}	
}

const getGameById = async (context: DefaultContext) => {
	try {
		const result = await client.query(gamesQueries.getGameById(context.params.id));
		console.log(`Game query result : ${JSON.stringify(result.rows)}`);
		context.status = 200;
		context.body = result.rows ? result.rows[0] : 'No results';
	} catch(error) {
		console.error(error);
	}	
}

const getGameHistory = async (context: DefaultContext) => {
	try {
		const result = await client.query(gamesQueries.getGameHistory(context.params.id));
		console.log(`Game history query result : ${JSON.stringify(result.rows)}`);
		context.status = 200;
		context.body = result.rows;
	} catch(error) {
		console.error(error);
	}	
}

const postGameBorrowing = async (context: DefaultContext) => {
	try {
		const userId = context.request.body.userId;
		const isAvailable = context.request.body.isAvailable;
		const gameId = context.request.params.id;
		const result = await client.query(gamesQueries.postGameBorrowing(userId, gameId, isAvailable));
		console.log(`Game action query result : ${JSON.stringify(result.rows)}`);
		context.body = result.rows[0] || {};
	} catch(error) {
		console.error(error);
	}	
}

export default {
	getGames,
	getGameById,
	getGameHistory,
	postGameBorrowing
}