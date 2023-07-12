import mongoose from "mongoose";
import MemoryInterface from "./memory.model.d";
const MemorySchema = new mongoose.Schema<MemoryInterface>(
	{
		from: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		to: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		answers: {
			type: [
				{
					answer: {
						type: String,
						default: "",
					},
					questionId: {
						type: Number,
					},
				},
			],
		},
		question: {
			type: mongoose.Types.ObjectId,
		},
		isPrivate: {
			type: Boolean,
			default: true,
		},
		imagePath: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

const MemoryModel = mongoose.model<MemoryInterface>("Memory", MemorySchema);

export default MemoryModel;
