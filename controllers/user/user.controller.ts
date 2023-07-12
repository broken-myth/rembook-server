import userModel from "../../models/user/user.model";

const excludes = {
	password: 0,
	hasSecondaryCreds: 0,
	isSecodaryCredsVerified: 0,
};

interface User {
	name: { $regex: RegExp };
	department: string;
	hostels: any;
	rollNumber: { $regex: RegExp };
}

const getUsers = {
	handler: async (req: any, res: any) => {
		try {
			const users = await userModel.find({}, excludes);
			if (users.length > 0) {
				res.code(200).send({ users });
			} else {
				res.code(404).send({ message: "Users not found" });
			}
		} catch {
			res.code(500).send({ message: "Error while trying to get users" });
		}
	},
};

const getUserById = {
	handler: async (req: any, res: any) => {
		try {
			const userId = req.query.id;
			if (!userId) {
				return res.code(400).send({ message: "User does not exist" });
			}
			const user = await userModel.findById(userId, excludes);
			if (user) {
				return res.code(200).send({ user: user });
			} else {
				return res.code(404).send({ message: "User not found" });
			}
		} catch {
			return res
				.code(500)
				.send({ message: "Error while trying to get the user" });
		}
	},
};

const getCurrentUser = {
	handler: async (req: any, res: any) => {
		try {
			const userId = req.currentUser;
			if (!userId) {
				return res.code(404).send({ message: "User doesn't exist" });
			}
			const user = await userModel.findById(userId, { password: 0 });
			if (user) {
				return res.code(200).send({
					user: {
						_id: user._id,
						name: user.name,
						email: user.email,
						rollNumber: user.rollNumber,
						dateOfBirth: user.dateOfBirth,
						hostels: user.hostels,
						department: user.department,
						userBio: user.userBio,
						image: user.image,
						linkedin: user.linkedin,
						instagram: user.instagram,
						contact: user.contact,
					},
					message: "Logged in Successfully",
					hasSecondaryCreds: user.hasSecondaryCreds,
					isSecodaryCredsVerified: user.isSecodaryCredsVerified,
					isProfileUpdated: user.isProfileUpdated,
				});
			} else {
				res.code(404).send({ message: "User not found" });
			}
		} catch {
			res.code(500).send({ message: "Error while trying to get the user" });
		}
	},
};

const getRecommend = {
	handler: async (req: any, res: any) => {
		let results;
		try {
			const userId = req.currentUser;
			if (!userId) {
				return res.code(404).send({ message: "User doesn't exist" });
			}
			const user = await userModel.findById(userId, excludes);
			if (!user) {
				return res.code(404).send({ message: "User not found" });
			}
			const userBatch = user?.rollNumber.slice(4, 6);
			const regExp = new RegExp("^.{4}" + userBatch + ".*");
			if (user?.department && user?.rollNumber) {
				results = await userModel
					.find({
						rollNumber: regExp,
						department: user.department,
						_id: { $ne: req.params.id },
					})
					.exec();
				if (results?.length > 30) {
					const start = Math.floor(Math.random() * (results.length - 30));
					return res.code(200).send(results.slice(start, start + 30));
				} else {
					return res.code(200).send(results);
				}
			}
		} catch {
			return res.code(500).send({
				message: "Error while getting the recommended users",
			});
		}
	},
};

const uploadProfileImage = {
	handler: async (req: any, res: any) => {
		try {
			const currentUser = req.currentUser;
			const fileName = req.file.filename;
			const user = await userModel.findOne({ _id: currentUser });
			if (!user) {
				return res.code(400).send({ message: "User not found" });
			}
			await userModel.findOneAndUpdate(
				{ _id: currentUser },
				{
					image: fileName,
				}
			);
			return res
				.code(200)
				.send({ message: "Profile picture updated successfully" });
		} catch {
			return res
				.code(500)
				.send({ message: "Error while updating profile picture" });
		}
	},
};

const updateProfile = {
	handler: async (req: any, res: any) => {
		try {
			const currentUser = req.currentUser;
			const hostelList = req.body.hostels;
			const userBio = req.body.userBio;
			const dateOfBirth = req.body.dateOfBirth;
			const linkedin = req.body.linkedin || "";
			const instagram = req.body.instagram || "";
			const contact = req.body.contact || "";
			const user = await userModel.findOne({ _id: currentUser });
			if (!user) {
				return res.code(400).send({ message: "User not found" });
			}
			const updated = await userModel.findOneAndUpdate(
				{
					_id: currentUser,
				},
				{
					hostels: hostelList,
					userBio: userBio,
					dateOfBirth: dateOfBirth,
					isProfileUpdated: true,
					linkedin: linkedin,
					instagram: instagram,
					contact: contact,
				},
				{
					new: true,
				}
			);
			if (!updated) {
				return res
					.code(400)
					.send({ message: "Error while updating profile" });
			}
			return res
				.code(200)
				.send({ message: "Updated the profile successfully" });
		} catch {
			return res.code(500).send({ message: "Error while updating profile" });
		}
	},
};

const getSearch = {
	handler: async (req: any, res: any) => {
		const name = req.query.name;
		const dept = req.query.dept;
		const hostels = req.query.hostels ? req.query.hostels.split(",") : [];
		const batch = req.query.batch;
		const regExpBatch = new RegExp("^.{4}" + batch + ".*");
		const regExpName = new RegExp("^.*" + name + ".*$", "i");

		const query: Partial<User> = {};

		if (name) {
			query.name = { $regex: regExpName };
		}
		if (dept) {
			query.department = dept;
		}
		if (hostels.length > 0) {
			query.hostels = { $in: hostels };
		}
		if (batch) {
			query.rollNumber = { $regex: regExpBatch };
		}
		try {
			const results = await userModel.find(query);
			if (results.length > 0) {
				return res.code(200).send(results);
			} else return res.code(400).send({ message: "No users found ):" });
		} catch {
			res.code(500).send({
				message: "Error while getting the search results",
			});
		}
	},
};

export {
	getUsers,
	getUserById,
	getRecommend,
	getCurrentUser,
	uploadProfileImage,
	updateProfile,
	getSearch,
};
