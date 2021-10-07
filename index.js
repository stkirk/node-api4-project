require("dotenv").config(); //allows to inject env variables
const { PORT } = require("./config");

const server = require("./api/server");

server.listen(PORT, () => console.log("server listening on PORT:", PORT));
