import { Type } from "@sinclair/typebox";

const loginAdminBody = Type.Object({
	email: Type.String(),
	password: Type.String(),
	token: Type.String(),
});

const getUserBody = Type.Object({
	rollNumber: Type.String(),
});

const updateUserBody = Type.Object({
	rollNumber: Type.String(),
	newEmail: Type.String(),
});

export { loginAdminBody, getUserBody, updateUserBody };
