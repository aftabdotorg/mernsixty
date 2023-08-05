require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const port = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

// ! new mongoose version doesnt accepots callback in find hence try below code
app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((results) => {
      res.json(results);
    })
    .catch((err) => res.json(err));
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.listen(port, () => {
  console.log(`SERVER up on ${port}`);
});
