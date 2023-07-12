import { Schema, model, Types } from "mongoose";
import ForgotPasswordInterface from "./forgotPassword.model.d";

const ForgotPasswordSchema = new Schema<ForgotPasswordInterface>({
	user: {
		type: Types.ObjectId,
	},
	secretHash: {
		type: String,
		default: "",
	},
	code: {
		type: String,
		default: "",
	},
});

const ForgotPassword = model<ForgotPasswordInterface>(
	"ForgotPassword",
	ForgotPasswordSchema
);

export default ForgotPassword;
