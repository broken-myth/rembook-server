import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import {
	getCurrentUser,
	getUserById,
	getUsers,
	getRecommend,
	uploadProfileImage,
	updateProfile,
	getSearch,
} from "../controllers/user/user.controller";
import signToken from "../middleware/auth/signTokens";
import { upload, uploadImage } from "../middleware/multer/multer";
const routes: RouteOptions[] = [
	{
		method: "GET",
		url: "/getUsers",
		preHandler: [signToken],
		handler: getUsers.handler,
	},
	{
		method: "GET",
		url: "/getUser",
		preHandler: [signToken],
		handler: getUserById.handler,
	},
	{
		method: "GET",
		url: "/getCurrentUser",
		preHandler: [signToken],
		handler: getCurrentUser.handler,
	},
	{
		method: "GET",
		url: "/getRecommend/:id",
		preHandler: [signToken],
		handler: getRecommend.handler,
	},
	{
		method: "POST",
		url: "/uploadProfileImage",
		preHandler: [signToken, upload, uploadImage],
		handler: uploadProfileImage.handler,
	},
	{
		method: "POST",
		url: "/updateProfile",
		preHandler: [signToken],
		handler: updateProfile.handler,
	},
	{
		method: "GET",
		url: "/getSearch",
		preHandler: [signToken],
		handler: getSearch.handler,
	},
];

const userRouter = (app: FastifyInstance) => {
	router(app, routes, "/user");
};

export { userRouter };
