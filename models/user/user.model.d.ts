import mongoose from "mongoose";
interface RoomNumber {
	hostelName: string;
	roomNumber: string;
}
interface UserInterface extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	contact: string;
	rollNumber: string;
	dateOfBirth: Date;
	hostels: RoomNumber[];
	department: string;
	userBio: string;
	image: string;
	isProfileUpdated: boolean;
	hasSecondaryCreds: boolean;
	isSecodaryCredsVerified: boolean;
	linkedin: string;
	instagram: string;
}

export default UserInterface;
