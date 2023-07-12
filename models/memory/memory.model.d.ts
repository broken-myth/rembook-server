import mongoose from "mongoose";

interface AnswerInterface {
	answer: string;
	questionId: number;
}

interface MemoryInterface extends mongoose.Document {
	from: mongoose.ObjectId;
	to: mongoose.ObjectId;
	question: mongoose.ObjectId;
	answers: [AnswerInterface];
	isPrivate: boolean;
	imagePath: string;
}

export default MemoryInterface;
