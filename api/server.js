const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const userData = require("../data/userData");

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
  res.json({ message: "username and password list", data: userData });
});

server.post("/api/register", (req, res) => {
  const newUser = req.body;
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: "username and password required" });
  } else {
    userData.push(newUser);
    res.status(201).json(newUser);
  }
});

server.post("/api/login", (req, res) => {
  const credentials = req.body;
  const verified = userData.filter((user) => {
    if (
      user.username === credentials.username &&
      user.password === credentials.password
    ) {
      return user;
    } else {
      return false;
    }
  });
  if (!verified[0]) {
    console.log("verified-->", verified);
    res.status(400).json({ message: "please provide valid credentials" });
  } else {
    console.log("verified-->", verified);

    res.status(201).json({ message: `Welcome ${credentials.username}` });
  }
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
