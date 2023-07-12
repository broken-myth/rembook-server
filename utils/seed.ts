import config from "../config/config";
import connectDatabase from "./connectDB";
import userModel from "../models/user/user.model";
import path from "path";
import dotenv from "dotenv";
dotenv.config({
	path: path.join(__dirname, "..").replace("dist", ".env"),
});

const seed = [
	{
		name: "John Doe",
		email: "mritul2003@gmail.com",
		password: "janedoe",
		rollNumber: "109191911",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
	{
		name: "Jane Doe",
		email: "janenew@gmail.com",
		password: "janedoe",
		rollNumber: "102191911",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
	{
		name: "Jamie",
		email: "fjaldfj@lja.com",
		password: "janedoe",
		rollNumber: "109311911",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
	{
		name: "Jolie",
		email: "dsf@jf.com",
		password: "janedoe",
		rollNumber: "109191911",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
	{
		name: "Toritila",
		email: "dsasjfa@gmail.com",
		password: "janedoe",
		rollNumber: "109191311",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
	{
		name: "Johansno",
		email: "jcss2003@fad.com",
		password: "janedoe",
		rollNumber: "209191911",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
	{
		name: "Meek",
		email: "meek2003@gmail.com",
		password: "janedoe",
		rollNumber: "109192911",
		dateOfBirth: new Date(),
		hostels: [
			{
				hostelName: "Zircon A",
				roomNumber: "108",
			},
		],
		department: "EEE",
		userBio: "lkskdjflasjfla",
	},
];

const seedUser = async () => {
	try {
		const users = await userModel.insertMany(seed);
		console.log(users);
	} catch {
		console.log("Error seeding users");
	}
};

connectDatabase(config.db);
seedUser();
