import multer from "fastify-multer";
import path from "path";
import crypto from "crypto";
import { preHandlerAsyncHookHandler } from "fastify";
const MAX_IMAGE_SIZE = 1024 * 1024 * 2;
const storage = multer.diskStorage({
	destination: (req: any, file, callback) => {
		if (req.body.to)
			callback(
				null,
				path.join(
					__dirname,
					"..",
					"..",
					"..",
					"public",
					"images",
					"memories"
				)
			);
		else {
			callback(
				null,
				path.join(
					__dirname,
					"..",
					"..",
					"..",
					"public",
					"images",
					"profiles"
				)
			);
		}
	},
	filename: (req, file, callback) => {
		if (
			file.mimetype !== "image/png" &&
			file.mimetype !== "image/jpg" &&
			file.mimetype !== "image/jpeg"
		) {
			const error = new Error();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			error.code = "filetype";
			return callback(error);
		} else {
			const fileName = crypto.randomBytes(10).toString("hex");
			file.filename = fileName;
			callback(null, fileName + ".jpg");
		}
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: MAX_IMAGE_SIZE },
}).single("image");

const uploadImage: preHandlerAsyncHookHandler = async (req: any, res: any) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	upload(req, res, (err: NodeJS.ErrnoException) => {
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				return res.code(400).send({ message: "File size is too large" });
			} else if (err.code === "filetype") {
				return res.code(400).send({ message: "Invalid file type" });
			} else
				return res.code(400).send({
					message: "Some error occured while uploading the file",
				});
		} else {
			if (!req.file) {
				return res.code(400).send({ message: "No file was selected" });
			}
		}
	});
};
export { upload, uploadImage };
