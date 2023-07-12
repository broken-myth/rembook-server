import { Type } from "@sinclair/typebox";

const loginBody = Type.Object({
	email: Type.String(),
	password: Type.String(),
	token: Type.String(),
});

const forgotPasswordBody = Type.Object({
	email: Type.String(),
	token: Type.String(),
});

export { forgotPasswordBody, loginBody };
