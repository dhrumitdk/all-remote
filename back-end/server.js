import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Data from "./Data.js";
import userData from "./models/userModel.js";
import taskData from "./models/taskModel.js";
import wallData from "./models/wallModel.js";

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

// sign up get and post endpoints
app.get("/user-signup-endpoint", (req, res) => {
  userData.find((err, data) => {
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

// task get and post endpoints
app.get("/task-endpoint", (req, res) => {
  taskData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "noreply.allremote@gmail.com",
          pass: "allremote@123",
        },
      });

      const mailOptions = {
        from: "noreply.allremote@gmail.com",
        to: data.assignee,
        subject: "New Task Assigned!",
        html: `<img src = 'https://i.ibb.co/wR4CkQ6/logo.png'> <br /><br /> <b> Task Name: </b> ${data.taskName}. <br /> <b> Priority: </b> ${data.priority}. <br /> <b> Due Date:  </b> ${data.dueDate}. <br /><br /> Have a good day &#128512;`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Email sent!");
      });
    }
  });
});

// wall posts get and post endpoints
app.get("/wall-endpoint", (req, res) => {
  wallData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/wall-endpoint", (req, res) => {
  const dbTasks = req.body;

  wallData.create(dbTasks, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// for getting document based on id provided from front end
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  wallData.findById({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/find-one-endpoint", (req, res) => {
  taskData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
