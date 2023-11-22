import { ParameterizedContext } from "koa";

const hc = (ctx: ParameterizedContext) => {
	ctx.body = {
		healthcheck: 'OK',
	}
}

export default {
	hc
}