const alphabet =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const randomString = (length: number) => {
	let result = "";
	for (let i = 0; i < length; ++i) {
		result += alphabet[Math.floor(alphabet.length * Math.random())];
	}
	return result;
};

export default randomString;
