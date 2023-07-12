import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import {
	getUser,
	loginAdmin,
	logoutAdmin,
	updateUser,
} from "../controllers/admin/admin.controller";
import adminToken from "../middleware/auth/adminTokens";
const routes: RouteOptions[] = [
	{
		method: "POST",
		url: "/adminLogin",
		handler: loginAdmin.handler,
	},
	{
		method: "GET",
		url: "/adminLogout",
		preHandler: [adminToken],
		handler: logoutAdmin.handler,
	},
	{
		method: "POST",
		url: "/getUser",
		preHandler: [adminToken],
		handler: getUser.handler,
	},
	{
		method: "POST",
		url: "/updateUser",
		preHandler: [adminToken],
		handler: updateUser.handler,
	},
];

const adminRouter = (app: FastifyInstance) => {
	router(app, routes, "/admin");
};

export { adminRouter };
