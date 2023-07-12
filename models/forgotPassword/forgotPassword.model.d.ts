import { Document, ObjectId } from "mongoose";

interface ForgotPasswordInterface extends Document {
	user: ObjectId;
	secretHash: string;
	code: string;
}

export default ForgotPasswordInterface;
