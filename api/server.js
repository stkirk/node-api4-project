const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(`
        <h1>
            You have found a successfully deployed API
        </h1>
        <h3>
            Endpoints:
        </h3>
        <ul>
            <li>
                [GET] /api/users --> list of users 
            </li>
            <br/>
            <li>
                [POST] /api/register --> Creates a user from { username, password } in the request body, responds with newly created user.
            </li>
            <br/>
            <li>
                [POST] /api/login --> Checks { username, password } in the request body, responds with a welcome message. 
            </li>
        </ul>
    `);
});
server.get("/api/users", (req, res) => {
  res.send("array of users");
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
