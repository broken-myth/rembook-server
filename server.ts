import dotenv from "dotenv";
dotenv.config({
	path: __dirname.replace("dist", ".env"),
});
import { fastify, FastifyInstance } from "fastify";
import connectDatabase from "./utils/connectDB";
import config from "./config/config";
import { rootRouter } from "./routers/root.router";
import { memoryRouter } from "./routers/memory.router";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import type { FastifyCookieOptions } from "@fastify/cookie";
import { adminRouter } from "./routers/admin.router";
import { userRouter } from "./routers/user.router";
import multer from "fastify-multer";
import path from "path";
import fs from "fs";
import fastifyStatic from "@fastify/static";
const app: FastifyInstance = fastify({
	logger: config.logger,
});

connectDatabase(config.db);

app.register(cors, {
	origin: process.env.FRONTEND_URL,
	credentials: true,
});

app.register(cookie, {
	secret: process.env.COOKIE_SECRET as string,
	hook: "preHandler",
	parseOptions: {},
} as FastifyCookieOptions);

app.register(multer.contentParser);

app.register(fastifyStatic, {
	root: path.join(__dirname, "..", "public"),
});

app.get("/assets/images/profiles/*", (req: any, res: any) => {
	try {
		if (fs.existsSync("./public/images/profiles/" + req.params["*"])) {
			return res.sendFile("images/profiles/" + req.params["*"]);
		} else {
			// Add a dummy profile picture here
			return res.sendFile("images/profiles/temp.png");
		}
	} catch (e) {
		console.log(e);
		return res.code(500).send({ message: "Error while fetching the image" });
	}
});

app.get("/assets/images/memories/*", (req: any, res: any) => {
	try {
		if (fs.existsSync("./public/images/memories/" + req.params["*"])) {
			return res.sendFile("images/memories/" + req.params["*"]);
		} else {
			// Add a dummy memory picture here
			return res.sendFile("images/memories/temp.png");
		}
	} catch (e) {
		return res.code(500).send({ message: "Error while fetching the image" });
	}
});

rootRouter(app);
memoryRouter(app);
adminRouter(app);
userRouter(app);

app.listen({ port: config.port, host: config.host }, (): void => {
	console.log(`Server running at http://localhost:${config.port}`);
});
