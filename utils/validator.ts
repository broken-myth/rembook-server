import fetch from "cross-fetch";
const verifyCaptcha = async (token: string) => {
	try {
		const secretKey = process.env.RECAPTCHA_SECRET_KEY as string;
		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
		const fetchResponse = await fetch(url, {
			method: "POST",
		});
		const googleResponse = await fetchResponse.json();
		if (googleResponse.score > 0.5) return true;
		else return false;
	} catch (e) {
		return false;
	}
};

const isEmail = (email: string) => {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return regex.test(email);
};

export { verifyCaptcha, isEmail };
