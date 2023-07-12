import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import {
	updateRem,
	getMyRems,
	getMyWrittenRems,
	getPublicRemsOfUser,
	getRemOfPair,
	makeRemPrivate,
	makeRemPublic,
} from "../controllers/memory/memory.controller";
import signToken from "../middleware/auth/signTokens";
import { upload } from "../middleware/multer/multer";
const routes: RouteOptions[] = [
	{
		method: "POST",
		url: "/updateRem",
		preHandler: [signToken, upload],
		handler: updateRem.handler,
	},
	{
		method: "GET",
		url: "/getMyAllRems",
		preHandler: [signToken],
		handler: getMyRems.handler,
	},
	{
		method: "GET",
		url: "/getMyWrittenRems",
		preHandler: [signToken],
		handler: getMyWrittenRems.handler,
	},
	{
		method: "POST",
		url: "/getUserRems",
		preHandler: [signToken],
		handler: getPublicRemsOfUser.handler,
	},
	{
		method: "POST",
		url: "/getRemOfPair",
		preHandler: [signToken],
		handler: getRemOfPair.handler,
	},
	{
		method: "POST",
		url: "/makePrivate",
		preHandler: [signToken],
		handler: makeRemPrivate.handler,
	},
	{
		method: "POST",
		url: "/makePublic",
		preHandler: [signToken],
		handler: makeRemPublic.handler,
	},
];

const memoryRouter = (app: FastifyInstance) => {
	router(app, routes, "/memory");
};

export { memoryRouter };
