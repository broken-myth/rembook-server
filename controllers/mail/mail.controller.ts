import nodeMailer from "nodemailer";
import { getResetAuthHTML } from "../../utils/template";

const transporter = nodeMailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.SMTP_USER as string,
		pass: process.env.SMTP_PASS as string,
	},
});

const sendResetAuthToken = async (
	email: string,
	token: string,
	hash: string
) => {
	const link =
		process.env.FRONTEND_URL +
		"/auth/user/resetpass?email=" +
		email +
		"&hash=" +
		hash;
	const message = getResetAuthHTML(link, token);
	try {
		await sendNodeMail(email, "Rembook Reset Password", message);
		return;
	} catch (e) {
		console.log("Error while sending mail ", e);
		return;
	}
};

const sendNodeMail = async (
	email: string,
	subject: string,
	mailContent: any
) => {
	try {
		const data = {
			from: "Rembook <no-reply@rembook.nitt.edu>",
			to: email,
			subject: subject,
			html: mailContent,
		};

		await transporter.sendMail(data);
		return Promise.resolve(null);
	} catch {
		console.log("Error while sending the email to ", email);
		return Promise.reject(null);
	}
};

export { sendResetAuthToken };
