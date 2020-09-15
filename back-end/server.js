import express from "express";
import mongoose from "mongoose";
import Data from "./Data.js";
import userData from "./models/userModel.js";
import taskData from "./models/taskModel.js";

// app config
const app = express();
const port = 4000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// DB config
const connectionURL = "mongodb://localhost:27017/all-remote";
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoints
app.get("/", (req, res) => {
  const testData = "testData";
  res.send("Hello Express server is up and running!");
  console.log(testData);
});

app.get("/data-endpoint", (req, res) => {
  res.status(200).send(Data);
});

app.get("/user-signup-endpoint", (req, res) => {
  userData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/task-endpoint", (req, res) => {
  taskData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/user-signup-endpoint", (req, res) => {
  const dbUsers = req.body;

  userData.create(dbUsers, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/task-endpoint", (req, res) => {
  const dbTasks = req.body;

  taskData.create(dbTasks, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
