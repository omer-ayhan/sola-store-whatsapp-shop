const express = require("express");
const next = require("next");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
// const cors = require('cors');

app.prepare().then(() => {
	const server = express();

	server.set("trust proxy", 1);

	server.all("*", (req, res) => {
		return handle(req, res);
	});

	server.listen(port, (err) => {
		if (err) {
			console.error(err);
			throw err;
		}
		console.log(`> Ready on http://${hostname}:${port}`);
	});
});
