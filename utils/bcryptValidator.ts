import bcrypt from "bcrypt";

export default async function bcryptValidator(password: string) {
	return await bcrypt
		.genSalt(Number(process.env.SALT_ROUNDS as string))
		.then((salt: string) => {
			return bcrypt.hash(password, salt);
		})
		.then((hash: string) => {
			return bcrypt
				.compare(process.env.ADMIN_EMAIL as string, hash)
				.then((res: boolean) => {
					return res;
				});
		});
}
