# Rembook 23 - Server

## Installation

Clone the repo to your device.

1. Make sure you have installed yarn on your device

2. Install the node modules:

```bash
yarn install
```

3. Copy and <b>Configure</b> the [.example.env](https://github.com/delta/rembook-server-23/blob/main/.env.example ".example.env") then rename it as `.env`, then it should like

```environment
ENV=DEV
MONGODB_URI=mongodb://localhost:27017/
PORT=4000
DAUTH_CLIENT_ID=
DAUTH_CLIENT_SECRET=
DAUTH_REDIRECT_URI=
JWT_SECRET=
FRONTEND_URL=
SMTP_USER=
SMTP_PASS=
COOKIE_SECRET=
....
```

4. Copy and <b>Configure</b> the [config.example.ts](https://github.com/delta/rembook-server-23/blob/main/config/config.example.ts "config.example.ts") then rename it as `config.ts`, then it should like

```typescript
const config = {
 db: "rembook-23",
 port: parseInt(process.env.PORT ?? "4000"),
 logger:
  process.env.ENV === "DEV" ?
   {
    transport: {
     target: "pino-pretty",
     options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
     },
    }
   } : true
 ,
};

export default config;
```

5. Start the server in developer mode:

```bash
yarn run dev
```

The server should be ruuning at your local host port 4000.

## Docker Setup for Prod

1. In `.env` make sure `HOST=0.0.0.0` and `MONGODB_URI=mongodb://db:27017/`
2. Start the containers
```shell
docker-compose up --build -d
```

## Adding a Route/Controller

1. Create `routers/example.router.ts` file for the example (if it doesn't exist) whose route you want to add.

2. The template for the example router is:

```typescript
import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import { controller_METHOD } from "../controllers/example/example.controller";

const routes: RouteOptions[] = [
 {
  method: "METHOD", // GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
  url: "/route", // URL
  preHandler: [], // Pre Handlers ex: [signToken]
  schema: controller_METHOD.schema, // Schema
  handler: controller_METHOD.handler, // Handler
 },
 // Add as many routes as you want
];

const modelRouter = (app: FastifyInstance) => {
 router(app, routes);
};

export { modelRouter };
```

3. Create `controllers/example/example.controller.ts` file and add the controller code. The template for the controller is:

```typescript

const controllerMethod = {
 schema: {
  body: controllerModelSchema,
  response: controllerModelResponse,
 },
 handler: async (req, res) => {
  // Code
 },
};

// Add as many controllers as you want

export { controllerMethod };
```

4. Finally import the router in server.ts file and add it to the server.

```typescript
import { modelRouter } from "../routers/model.router";
...
modelRouter(app);
...
```

---

## Setting up Nodemailer mailing service

Go through this medium article for setting the environment variables `SMTP_USER` and `SMTP_PASS` in `.env` file.

[Link to article](https://edigleyssonsilva.medium.com/how-to-send-emails-securely-using-gmail-and-nodejs-eef757525324 "Set up nodemailer for nodejs")

## Setting up DAuth Client

1. Go to [Dauth Client Manager](https://auth.delta.nitt.edu/client-manager) and make a new client.
2. Set homepage url as the `base url of the client` (Frontend).
3. Set the callback url as `clientUrl/auth/user/callback`. This will be your callback url if the client is running locally on port 8000

```bash
http://localhost:8000/auth/user/callback
```

4. Copy the `Client Secret` and `Client Id` and use it in `.env`.

## Setting Hashed ADMIN_PASSWORD in .env


```javascript
const bcrypt = require("bcrypt");
const saltrounds = 10; // Ensure value is same as SALT_ROUNDS in .env
const password = "your_password";
bcrypt
    .genSalt(saltrounds)
    .then(salt => {
        console.log('Salt: ', salt)
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        console.log('Hash: ', hash)
    })
    .catch(err => console.error(err.message))


```
