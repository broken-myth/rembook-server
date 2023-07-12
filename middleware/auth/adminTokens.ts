import { verify, JwtPayload } from "jsonwebtoken";
import {
	preHandlerAsyncHookHandler,
	FastifyRequest,
	FastifyReply,
} from "fastify";
const JWTPayload = (value: JwtPayload | string): JwtPayload => {
	return value as JwtPayload;
};

const checkAdminLoggedIn: preHandlerAsyncHookHandler = async (
	req: FastifyRequest,
	res: FastifyReply
) => {
	const token = req.cookies.token as string;
	let payload: string | JwtPayload;
	try {
		payload = verify(token, process.env.JWT_SECRET as string);
	} catch (e) {
		return res.code(401).send({ message: "Not logged in" });
	}
	const finalPayload = JWTPayload(payload);
	const admin = finalPayload["isAdmin"];
	if (!admin || admin === undefined) {
		return res.code(401).send({ message: "User is not Admin" });
	}
};

export default checkAdminLoggedIn;
