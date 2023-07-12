import userModel from "../../models/user/user.model";
import { fetchUserDetails } from "../../utils/fetchUserDetails";
import { newToken } from "../../middleware/auth/getTokens";
import { isEmail, verifyCaptcha } from "../../utils/validator";
import { sendResetAuthToken } from "../mail/mail.controller";
import crypto from "crypto";
import { forgotPasswordBody, loginBody } from "./types";
import ForgotPasswordModel from "../../models/forgotPassword/forgotPassword.model";
import assignDepartment from "../../utils/getDepartment";
import randomString from "../../utils/randomStringGenerator";
const dauthLogin = {
	handler: async (req: any, res: any) => {
		try {
			const code = req.query.code;
			const userDetailsDauth: any = await fetchUserDetails(code);
			if (!userDetailsDauth) {
				return res.code(404).send({ message: "Dauth user doesn't exist" });
			}
			const rollNumber = userDetailsDauth.email.substring(0, 9);
			let user = await userModel.findOne({ rollNumber: rollNumber });
			if (!user) {
				let deptCode = rollNumber.substr(0, 3);
				let dept;
				if (deptCode != "202" || deptCode != "205") {
					dept = assignDepartment(deptCode);
				} else {
					deptCode = rollNumber.substring(0, 4);
					if (deptCode == "2023") {
						dept = "CEESAT";
					} else if (deptCode == "2051") {
						dept = "MCA";
					} else if (deptCode == "2053") {
						dept = "CSE";
					} else {
						dept = "CHL";
					}
				}
				if (dept == -1) {
					dept = "N/A";
				}
				user = await userModel.create({
					email: userDetailsDauth.email,
					name: userDetailsDauth.name,
					rollNumber: rollNumber,
					department: dept,
				});
				await user.save();
			}

			const userDetails = {
				email: user.email,
				name: user.name,
				rollNumber: user.rollNumber,
				isAdmin: false,
			};

			const token = newToken(userDetails);
			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				path: "/",
			});

			return res.code(200).send({
				message: "Logged in Successfully",
				hasSecondaryCreds: user.hasSecondaryCreds,
				isSecodaryCredsVerified: user.isSecodaryCredsVerified,
				isProfileUpdated: user.isProfileUpdated,
			});
		} catch (e) {
			//redirect to the home page again with a error toast
			console.log("Error while logging through dauth ", e);
			return res.code(500).send({ message: "Error while logging in" });
		}
	},
};

const loginUser = {
	schema: {
		body: loginBody,
	},
	handler: async (req: any, res: any) => {
		try {
			const email: string = req.body.email;
			const password: string = req.body.password;
			const token: string = req.body.token;
			if (email && password) {
				if (!verifyCaptcha(token)) {
					return res
						.code(400)
						.send({ message: "Captcha verification failed" });
				}
				if (!isEmail(email)) {
					return res.code(400).send({ message: "Enter a valid email" });
				}
				const user = await userModel.findOne({ email: email });
				if (!user) {
					return res.code(400).send({ message: "User not found" });
				}
				const hashedPassword = crypto
					.createHash("md5")
					.update(password)
					.digest("hex");
				if (user.password === hashedPassword) {
					const userDetails = {
						email: user.email,
						name: user.name,
						rollNumber: user.rollNumber,
						isAdmin: false,
					};
					const token = newToken(userDetails);
					res.cookie("token", token, {
						httpOnly: true,
						secure: true,
						sameSite: "none",
						path: "/",
					});
					return res.code(200).send({
						message: "Logged in Successfully",
						hasSecondaryCreds: user.hasSecondaryCreds,
						isSecodaryCredsVerified: user.isSecodaryCredsVerified,
						isProfileUpdated: user.isProfileUpdated,
					});
				} else {
					return res.code(400).send({ message: "Invalid credentials" });
				}
			} else {
				return res.code(400).send({ message: "Required fields are empty" });
			}
		} catch (e) {
			//redirect to the home page again with a error toast
			return res.code(500).send({ message: "Error while logging in ", e });
		}
	},
};

const forgotPassword = {
	schema: {
		body: forgotPasswordBody,
	},
	handler: async (req: any, res: any) => {
		try {
			const email: string = req.body.email;
			const token: string = req.body.token;
			if (email) {
				if (!verifyCaptcha(token)) {
					return res
						.code(400)
						.send({ message: "Captcha verification failed" });
				}
				if (!isEmail(email)) {
					return res.code(400).send({ message: "Enter a valid email" });
				}
				const user = await userModel.findOne({ email: email });
				if (!user) {
					return res.code(400).send({ message: "User not found" });
				}

				const forgotPasswordToken = randomString(6);
				const secretHash = crypto.randomBytes(16).toString("hex");
				await ForgotPasswordModel.findOneAndUpdate(
					{ user: user._id },
					{
						code: forgotPasswordToken,
						secretHash: secretHash,
					},
					{
						new: true,
						upsert: true,
					}
				);
				await sendResetAuthToken(email, forgotPasswordToken, secretHash);
				return res.code(200).send({ message: "Reset password mail sent" });
			} else {
				return res.code(400).send({ message: "Required fields are empty" });
			}
		} catch (e) {
			console.log("Error while forgot password send mail ", e);
			return res.code(500).send({ message: "Error while sending mail" });
		}
	},
};

const verifyForgotPassword = {
	handler: async (req: any, res: any) => {
		try {
			const email = req.query.email;
			const hash = req.query.hash;
			const token = req.body.token;
			const code = req.body.code;
			const password = req.body.password;

			if (!email || !hash) {
				return res.code(400).send({ message: "Invalid request" });
			}
			if (!verifyCaptcha(token)) {
				return res
					.code(400)
					.send({ message: "Captcha verification failed" });
			}
			const user = await userModel.findOne({ email: email });
			if (!user) {
				return res
					.code(400)
					.send({ message: "Invalid forgot password link" });
			}
			const forgotPasswordDocument = await ForgotPasswordModel.findOne({
				user: user._id,
				secretHash: hash,
			});

			if (!forgotPasswordDocument) {
				return res
					.code(400)
					.send({ message: "Invalid link, try sending the email again" });
			}

			if (code !== forgotPasswordDocument.code) {
				return res.code(400).send({
					message:
						"Incorrect code, enter the correct code sent to your email",
				});
			}

			const newPassword = crypto
				.createHash("md5")
				.update(password)
				.digest("hex");

			await userModel.findOneAndUpdate(
				{
					email: email,
				},
				{
					password: newPassword,
				}
			);

			await ForgotPasswordModel.deleteOne({ user: user._id });

			return res
				.code(200)
				.send({ message: "Password changed successfully" });
		} catch {
			return res
				.code(500)
				.send({ message: "Error occured while changing password" });
		}
	},
};

const addSecondaryCreds = {
	handler: async (req: any, res: any) => {
		try {
			const currentUser = req.currentUser;
			const email = req.body.email;
			const password = req.body.password;
			if (!isEmail(email)) {
				return res.code(400).send({ message: "Enter a valid email" });
			}
			if (email.endsWith("@nitt.edu")) {
				return res
					.code(400)
					.send({ message: "Enter email other than webmail" });
			}

			const user = await userModel.findOne({ _id: currentUser });
			if (!user) {
				return res.code(400).send({ message: "User doesn't exist" });
			}
			const checkEmail = await userModel.findOne({
				email: email,
				_id: { $ne: currentUser },
			});
			if (checkEmail) {
				return res.code(400).send({ message: "Email already in use" });
			}
			const hashedPassword = crypto
				.createHash("md5")
				.update(password)
				.digest("hex");

			await userModel.updateOne(
				{
					_id: currentUser,
				},
				{
					email: email,
					password: hashedPassword,
					hasSecondaryCreds: true,
				}
			);

			return res
				.code(200)
				.send({ message: "Credentials updated successfully" });
		} catch {
			return res.code(500).send({
				message: "Error occured while updating secondary credentials",
			});
		}
	},
};

const logout = {
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

export {
	dauthLogin,
	loginUser,
	forgotPassword,
	verifyForgotPassword,
	addSecondaryCreds,
	logout,
};
