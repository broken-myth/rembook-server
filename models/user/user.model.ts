import { Schema, model } from "mongoose";
import UserInterface from "./user.model.d";

const UserSchema = new Schema<UserInterface>({
	name: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		default: "",
	},
	password: {
		type: String,
		default: "",
	},
	rollNumber: {
		type: String,
		default: "",
	},
	contact: {
		type: String,
		default: "",
	},
	dateOfBirth: {
		type: Date,
		default: null,
	},
	hostels: {
		type: [
			{
				hostelName: {
					type: String,
				},
				roomNumber: {
					type: String,
				},
			},
		],
		default: [],
	},

	department: {
		type: String,
		default: "",
	},
	userBio: {
		type: String,
		default: "",
	},
	image: {
		type: String,
		default: null,
	},
	isProfileUpdated: {
		type: Boolean,
		default: false,
	},
	hasSecondaryCreds: {
		type: Boolean,
		default: false,
	},
	isSecodaryCredsVerified: {
		type: Boolean,
		default: false,
	},
	linkedin: {
		type: String,
		default: "",
	},
	instagram: {
		type: String,
		default: "",
	},
});

const User = model<UserInterface>("User", UserSchema);

export default User;
