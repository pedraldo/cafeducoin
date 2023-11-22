import { DefaultContext } from 'koa';
import dbClient from '../db/database-client';
import usersQueries from '../db/queries/users.queries';
import usersService from '../services/users.service';

const client = dbClient.getDatabaseClient();

const getUsers = async (context: DefaultContext) => {
  try {
    const result = await client.query(usersQueries.getUsers());
    context.body = result.rows;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (context: DefaultContext) => {
  try {
		const userId = context.params.id;
    const result = await client.query(usersQueries.getUserById(userId));
    context.body = result.rows;
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (context: DefaultContext) => {
		const userEmail = context.query.email as string;
    const user = await usersService.getUserByEmail(userEmail);
		context.body = user;
};

export default {
  getUsers,
	getUserById,
	getUserByEmail
};
