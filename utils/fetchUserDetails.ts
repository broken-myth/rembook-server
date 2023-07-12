import fetch from "cross-fetch";
const fetchUserDetails = async (code: string) => {
	try {
		const tokenEndpoint = "https://auth.delta.nitt.edu/api/oauth/token";
		const paramList = {
			code: code,
			client_id: process.env.DAUTH_CLIENT_ID as string,
			client_secret: process.env.DAUTH_CLIENT_SECRET as string,
			redirect_uri: process.env.DAUTH_REDIRECT_URI as string,
			grant_type: "authorization_code",
		};
		const params: URLSearchParams = new URLSearchParams(paramList);
		const dauthTokenResponse = await fetch(tokenEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: params,
		});

		const tokens = await dauthTokenResponse.json();

		const resourceEndpoint = "https://auth.delta.nitt.edu/api/resources/user";

		const dauthResourceResponse = await fetch(resourceEndpoint, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + tokens?.access_token,
			},
		});
		const dauthUserDetails = await dauthResourceResponse.json();

		const userResources = {
			email: dauthUserDetails.email,
			name: dauthUserDetails.name,
			gender: dauthUserDetails.gender,
		};
		return userResources;
	} catch (e) {
		console.log("Error in fetching details from Dauth: ", e);
	}
};

export { fetchUserDetails };
