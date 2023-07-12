import { allowedNodeEnvironmentFlags } from "process";
import questionModel from "../../models/question/question.model";

const getQuestions = {
	handler: async (req: any, res: any) => {
		try {
			const allQuestions = await questionModel.find({}).sort({ _id: -1 });
			if (allQuestions && allQuestions.length > 0) {
				return res.code(200).send({
					question: {
						id: allQuestions[0]._id,
						questions: allQuestions[0].questions,
					},
				});
			} else return res.code(404).send({ message: "Questions not found" });
		} catch {
			console.log("Error fetching the questions");
			res.code(500).send({ message: "Error while fetching questions" });
		}
	},
};

export { getQuestions };
