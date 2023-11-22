import { DefaultContext } from "koa";
import dbClient from '../db/database-client';
import usersQueries from "../db/queries/users.queries";
import jwt from "jsonwebtoken";
import authenticationService from "../services/authentication.service";
import usersService from "../services/users.service";

const client = dbClient.getDatabaseClient();

const register = async (context: DefaultContext) => {
  try {
    const userBody = context.request.body as any;
    const getUserResult = await client.query(usersQueries.getUserByEmail(userBody.email));

    if (getUserResult.rows.length) {
      const error = `User with email '${userBody.email}' already exists, no need to register again.`;
      context.status = 400;
      context.body = { error };
      console.error(error);
    } else {
      const hash = await authenticationService.getHashedPassword(userBody.password);

			if (!hash) {
				context.status = 500;
				const error = 'Error when hashing password';
				context.body = { error };
				console.error(error);
			} else {
				const user = { ...userBody, password: hash };
				const userCreated = await usersService.createUser(user);

				if (!userCreated) {
					const error = 'Error when creating user in database';
					context.status = 500;
					context.body = { error, email: userBody.email };
					console.error(error);
				} else {
					context.status = 201;
					context.body = userCreated;
				}
			}
    }
  } catch (error) {
    console.error(error);
    context.status = 500;
    context.body = { error };
  }
}

const login = async (context: DefaultContext) => {
	const { email, password } = context.request.body as any;

	try {
		const user = await usersService.getUserDataWithPasswordByEmail(email);
	
		if (!user) {
			const error = `No user with email '${email}'`;
			context.status = 400;
			context.body = { error };
			console.error(error);
		} else {
			const isCorrectPassword = await authenticationService.passwordMatchesWithHash(password, user.password);
			
			if (isCorrectPassword) {
				const { id, firstname, lastname } = user;
				const token = jwt.sign(
					{ id, firstname, lastname, email },
					process.env.JWT_SECRET_KEY as jwt.Secret,
					{ expiresIn: 300 } // 5 min : to test what happens when it expires
				);
				// const options = {
				// 	maxAge: 24 * 60 * 60 * 1000, // would expire in 24 hours
				// 	httpOnly: true, // The cookie is only accessible by the web server
				// 	secure: false, // set to true on production env using NODE_ENV var as condition
				// 	sameSite: false,
				// };
				// context.set("Access-Control-Allow-Credentials", "true");
				// context.set("Set-Cookie", `SessionID=${token}`);
				context.status = 200;
				context.body = {
					...user,
					token
				}
				// context.res.end();
			} else {
				const error = "Wrong password";
				context.status = 400;
				context.body = { error };
				console.error(error);
			}
		}
	} catch (error) {
		context.status = 500;
		context.body = { error };
		console.error(error);
	}
}

export default {
	register,
	login
}