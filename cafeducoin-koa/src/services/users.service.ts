import usersQueries from '../db/queries/users.queries';
import dbClient from '../db/database-client';
import { User, UserWithPassword } from '../types/shared/shared.types';

const client = dbClient.getDatabaseClient();

const createUser = async (user: Partial<User>): Promise<User> => {
	const { rows } = await client.query(usersQueries.createUser(user));

	if (!rows.length) {
		const msg = 'Error when trying to insert user into database';
		console.error(msg);
		throw new Error(msg);
	}
	return rows[0]; 
			
};

const getUserByEmail = async (email: string): Promise<User> => {
	const { rows } = await client.query(usersQueries.getUserByEmail(email));
	return (rows[0] || null);
};

const getUserDataWithPasswordByEmail = async (email: string): Promise<UserWithPassword> => {
	const { rows } = await client.query(usersQueries.getUserDataWithPasswordByEmail(email));
	return (rows[0] || null);
};

export default {
  createUser,
	getUserByEmail,
	getUserDataWithPasswordByEmail
};
