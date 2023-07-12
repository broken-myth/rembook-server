import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import {
	dauthLogin,
	loginUser,
	forgotPassword,
	verifyForgotPassword,
	addSecondaryCreds,
	logout,
} from "../controllers/auth/auth.controller";
import { getQuestions } from "../controllers/question/question.controller";
import signToken from "../middleware/auth/signTokens";

const routes: RouteOptions[] = [
	{
		method: "GET",
		url: "/dauth/callback",
		handler: dauthLogin.handler,
	},
	{
		method: "POST",
		url: "/login",
		schema: loginUser.schema,
		handler: loginUser.handler,
	},
	{
		method: "POST",
		url: "/forgotPassword",
		schema: forgotPassword.schema,
		handler: forgotPassword.handler,
	},
	{
		method: "GET",
		url: "/getQuestions",
		preHandler: [signToken],
		handler: getQuestions.handler,
	},
	{
		method: "POST",
		url: "/verifyForgotPassword",
		handler: verifyForgotPassword.handler,
	},
	{
		method: "POST",
		url: "/addSecondaryCreds",
		preHandler: [signToken],
		handler: addSecondaryCreds.handler,
	},
	{
		method: "POST",
		url: "/logout",
		handler: logout.handler,
	},
];

const rootRouter = (app: FastifyInstance) => {
	router(app, routes, "");
};

export { rootRouter };
