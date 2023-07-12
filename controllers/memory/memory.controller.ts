import memoryModel from "../../models/memory/memory.model";
import userModel from "../../models/user/user.model";
import questionModel from "../../models/question/question.model";
import MemoryInterface from "../../models/memory/memory.model.d";
const updateRem = {
	handler: async (req: any, res: any) => {
		try {
			const remAuthorId = req.currentUser;
			const remRecipientId = req.body.to;
			const questions = req.body.questions;
			const answers = req.body.answer;
			const imgPath = req.file?.filename || null;
			const remRecepient = await userModel.findOne({ _id: remRecipientId });
			if (!remRecepient) {
				return res
					.code(400)
					.send({ message: "Rem recipient doesn't exist" });
			}
			if (remRecipientId.toString() === remAuthorId.toString()) {
				return res
					.code(400)
					.send({ message: "Can't write rem for yourself" });
			}
			const question = await questionModel.findOne({ _id: questions });
			if (!question) {
				return res.code(400).send({ message: "Invalid questions" });
			}
			const memoryToUpdate = await memoryModel.findOneAndUpdate(
				{
					from: remAuthorId,
					to: remRecipientId,
				},
				{
					from: remAuthorId,
					to: remRecipientId,
					question: question._id,
					answers: answers,
					imagePath: imgPath,
				},
				{
					new: true,
					upsert: true,
				}
			);
			if (!memoryToUpdate) {
				return res
					.code(400)
					.send({ message: "Error occured, couldn't save the memory" });
			}
			return res.code(200).send({ message: "Updated the rem succesfully" });
		} catch {
			return res
				.code(500)
				.send({ message: "Error while updating the memory" });
		}
	},
};

const getMyRems = {
	handler: async (req: any, res: any) => {
		try {
			const currentUser = req.currentUser;
			const toUser = await userModel.findOne({ _id: currentUser });
			if (!toUser) {
				return res.code(400).send({ message: "User not found" });
			}
			const memories = await memoryModel.find({ to: currentUser });
			if (!memories || memories.length === 0) {
				return res
					.code(400)
					.send({ message: "No rems written for the current user" });
			}
			const finalMemory = await Promise.all(
				memories.map(async (memory: MemoryInterface, i: number) => {
					const fromUser = await userModel.findOne({ _id: memory.from });
					const question = await questionModel.findOne({
						_id: memory.question,
					});
					if (!fromUser || !question) {
						return null;
					}
					return {
						answers: memory.answers,
						question: question?.questions,
						from: fromUser?.name,
						to: toUser?.name,
						isPrivate: memory.isPrivate,
						fromID: fromUser?._id,
						toID: toUser?._id,
						remImage: memory.imagePath,
						userImage: fromUser?.image,
					};
				})
			);
			return res.code(200).send({ data: finalMemory });
		} catch {
			console.log("Error fetching the rems written for you");
			return res.code(500).send({ message: "Error fetching the rems" });
		}
	},
};

const getMyWrittenRems = {
	handler: async (req: any, res: any) => {
		try {
			const currentUser = req.currentUser;
			const fromUser = await userModel.findOne({ _id: currentUser });
			if (!fromUser) {
				return res.code(400).send({ message: "User not found" });
			}
			const memories = await memoryModel.find({ from: currentUser });
			if (!memories || memories.length === 0) {
				return res
					.code(400)
					.send({ message: "No rems written by the current user" });
			}
			const finalMemory = await Promise.all(
				memories.map(async (memory: MemoryInterface, i: number) => {
					const toUser = await userModel.findOne({ _id: memory.to });
					const question = await questionModel.findOne({
						_id: memory.question,
					});
					if (!toUser || !question) {
						return null;
					}
					return {
						answers: memory.answers,
						question: question?.questions,
						from: fromUser?.name,
						to: toUser?.name,
						isPrivate: memory.isPrivate,
						fromID: fromUser?._id,
						toID: toUser?._id,
						remImage: memory.imagePath,
						userImage: toUser?.image,
					};
				})
			);
			return res.code(200).send({ data: finalMemory });
		} catch {
			console.log("Error fetching the rems written by you");
			return res.code(500).send({ message: "Error fetching the rems" });
		}
	},
};

const getPublicRemsOfUser = {
	handler: async (req: any, res: any) => {
		try {
			const requestedUserId = req.body.to;
			const toUser = await userModel.findOne({ _id: requestedUserId });
			if (!toUser) {
				return res
					.code(400)
					.send({ message: "Requested user doesn't exist" });
			}
			const publicRems = await memoryModel.find({
				to: requestedUserId,
				isPrivate: false,
			});
			if (!publicRems || publicRems.length === 0) {
				return res.status(400).send({ message: "No public rems" });
			}
			const finalMemory = await Promise.all(
				publicRems.map(async (memory: MemoryInterface, i: number) => {
					const fromUser = await userModel.findOne({ _id: memory.from });
					const question = await questionModel.findOne({
						_id: memory.question,
					});
					if (!fromUser || !question) {
						return null;
					}
					return {
						answers: memory.answers,
						question: question?.questions,
						from: fromUser?.name,
						to: toUser?.name,
						isPrivate: false,
						fromID: fromUser?._id,
						toID: toUser?._id,
						remImage: memory.imagePath,
						userImage: fromUser.image,
					};
				})
			);
			return res.code(200).send({ data: finalMemory });
		} catch {
			console.log("Error fetching the rems");
			return res.code(500).send({ message: "Error fetching the rems" });
		}
	},
};

const getRemOfPair = {
	handler: async (req: any, res: any) => {
		try {
			const currentUser = req.currentUser;
			const recipientUser = req.body.id;
			const recipientUserModel = await userModel.findOne({
				_id: recipientUser,
			});
			if (!recipientUserModel) {
				return res.code(400).send({ message: "User doesn't exist" });
			}
			const memory = await memoryModel.findOne({
				from: currentUser,
				to: recipientUser,
			});
			if (!memory) {
				return res
					.code(400)
					.send({ message: "No rem exist between the two users" });
			}
			const currentUserModel = await userModel.findOne({ _id: currentUser });
			if (!currentUserModel) {
				return res.code(400).send({ message: "User doesn't exist" });
			}
			const question = await questionModel.findOne({
				_id: memory.question,
			});
			if (!question) {
				return res.code(400).send({ message: "Questions doesn't exist" });
			}
			const finalMemory = {
				answers: memory.answers,
				question: question?.questions,
				from: currentUserModel.name,
				to: recipientUserModel.name,
				isPrivate: false,
				fromID: currentUserModel._id,
				toID: recipientUser._id,
				userImage: recipientUserModel.image,
				remImage: memory.imagePath,
			};
			return res.code(200).send({ data: finalMemory });
		} catch {
			console.log("Error fetching the rems");
			return res.code(500).send({ message: "Error fetching the rems" });
		}
	},
};

const makeRemPrivate = {
	handler: async (req: any, res: any) => {
		try {
			const recipientUser = req.currentUser;
			const remAuthorId = req.body.from;
			const remAuthor = await userModel.findOne({ _id: remAuthorId });
			if (!remAuthor) {
				return res.code(400).send({ message: "No user exists" });
			}
			const memory = await memoryModel.findOneAndUpdate(
				{ to: recipientUser, from: remAuthorId },
				{
					isPrivate: true,
				},
				{
					new: true,
				}
			);
			if (!memory) {
				return res
					.code(400)
					.send({ message: "No rem exists between these users" });
			}
			return res.code(200).send({ message: "Memory made private" });
		} catch (e) {
			return res
				.code(500)
				.send({ message: "Error occured while making the rem private" });
		}
	},
};

const makeRemPublic = {
	handler: async (req: any, res: any) => {
		try {
			const recipientUser = req.currentUser;
			const remAuthorId = req.body.from;
			const remAuthor = await userModel.findOne({ _id: remAuthorId });
			if (!remAuthor) {
				return res.code(400).send({ message: "No user exists" });
			}
			const memory = await memoryModel.findOneAndUpdate(
				{ to: recipientUser, from: remAuthorId },
				{
					isPrivate: false,
				},
				{
					new: true,
				}
			);
			if (!memory) {
				return res
					.code(400)
					.send({ message: "No rem exists between these users" });
			}
			return res.code(200).send({ message: "Memory made public" });
		} catch {
			console.log("Error occured while making rem public");
			return res
				.code(500)
				.send({ message: "Error occured while making the rem public" });
		}
	},
};

export {
	updateRem,
	getMyRems,
	getMyWrittenRems,
	getPublicRemsOfUser,
	getRemOfPair,
	makeRemPrivate,
	makeRemPublic,
};
