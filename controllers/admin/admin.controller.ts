import userModel from "../../models/user/user.model";
import { newToken } from "../../middleware/auth/getTokens";
import { isEmail, verifyCaptcha } from "../../utils/validator";
import { getUserBody, loginAdminBody, updateUserBody } from "./types";
import bcryptValidator from "../../utils/bcryptValidator";

const loginAdmin = {
	schema: {
		body: loginAdminBody,
	},
	handler: async (req: any, res: any) => {
		try {
			const email: string = req.body.email;
			const password: string = req.body.password;
			const captchaToken: string = req.body.token;
			if (email && password) {
				if (!verifyCaptcha(captchaToken)) {
					return res
						.code(400)
						.send({ message: "Captcha verification failed" });
				}
				if (
					email != (process.env.ADMIN_EMAIL as string) ||
					!(await bcryptValidator(password))
				) {
					return res.code(401).send({ message: "Invalid Credentials" });
				}
				const adminDetails = {
					isAdmin: true,
				};

				const token = newToken(adminDetails);
				res.cookie("token", token, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
					path: "/",
				});
				return res.code(200).send({ message: "Signed In!" });
			} else {
				return res.code(400).send({ message: "Required fields are empty" });
			}
		} catch {
			//redirect to the home page again with a error toast
			return res.code(400);
		}
	},
};

const logoutAdmin = {
	handler: async (req: any, res: any) => {
		res.clearCookie("token", {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/",
		});
		return res.code(200).send({ message: "Signed Out!" });
	},
};

const getUser = {
	schema: {
		body: getUserBody,
	},
	handler: async (req: any, res: any) => {
		try {
			const rollNumber: string = req.body.rollNumber as string;
			if (rollNumber) {
				const user = await userModel.findOne(
					{ rollNumber: rollNumber },
					{
						_id: 0,
						email: 1,
						rollNumber: 1,
						name: 1,
					}
				);
				return res.code(200).send({ user });
			} else {
				return res.code(400).send({ message: "Required fields are empty" });
			}
		} catch {
			return res.code(400);
		}
	},
};

const updateUser = {
	schema: {
		body: updateUserBody,
	},
	handler: async (req: any, res: any) => {
		try {
			const rollNumber: string = req.body.rollNumber as string;
			const newEmail = req.body.newEmail;
			if (!isEmail(newEmail))
				return res.code(403).send({ message: "Not a valid Email" });
			if (rollNumber && newEmail) {
				const user = await userModel.findOne(
					{ rollNumber: rollNumber },
					{ _id: 1 }
				);
				if (!user) return res.code(403).send({ message: "User Not Found" });
				await userModel.findByIdAndUpdate(user._id, { email: newEmail });
				return res.code(200).send({ message: "Updated!" });
			} else {
				return res.code(400).send({ message: "Required fields are empty" });
			}
		} catch {
			return res.code(400);
		}
	},
};

export { loginAdmin, logoutAdmin, getUser, updateUser };
