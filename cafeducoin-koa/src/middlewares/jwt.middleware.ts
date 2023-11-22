import { Next, ParameterizedContext } from "koa";
import jwt from "jsonwebtoken";

export async function verifyJwt(context: ParameterizedContext, next: Next) {
	try {
		const token = context.get('Authorization').split("Bearer ")[1];

		if(!token) {
			context.status = 401;
		} else {
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret) as jwt.JwtPayload;
			if (!!decoded && !!decoded.email) {
				return next();
			} else {
				context.status = 401;
				context.body = {
					message: 'Invalid token found'
				};
			}
		}
	} catch(error: any) {
		const msg = `Error when verifying jwt : ${JSON.stringify(error.message)}`;

		if (error.name === "TokenExpiredError") {
			context.status = 401;
		}
		console.error(msg);
		context.body = {
			error: msg
		}
	}
}