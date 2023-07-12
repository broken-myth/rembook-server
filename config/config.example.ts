const config = {
	db: "rembook-23",
	port: parseInt(process.env.PORT ?? "4000"),
	host: process.env.HOST as string,
	logger:
		process.env.ENV === "DEV"
			? {
					transport: {
						target: "pino-pretty",
						options: {
							translateTime: "HH:MM:ss Z",
							ignore: "pid,hostname",
						},
					},
			  }
			: true,
};

export default config;
