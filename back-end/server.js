import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Data from "./Data.js";
import userData from "./models/userModel.js";
import taskData from "./models/taskModel.js";
import scheduleData from "./models/schedulesModel.js";
import wallData from "./models/wallModel.js";
import invitationData from "./models/invitationsModel.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// DB config
const connectionURL =
  "mongodb+srv://dhrumitdk:dhrumit99@cluster0.ve3ls.mongodb.net/all-remote?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello Express server is up and running!");
});

app.get("/data-endpoint", (req, res) => {
  res.status(200).send(Data);
});

// sign up get and post endpoints
app.get("/api/user-signup", (req, res) => {
  userData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/user-signup", (req, res) => {
  const dbUsers = req.body;

  userData.create(dbUsers, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/api/delete-project/:id", (req, res) => {
  const projectData = req.params.id;

  userData
    .findByIdAndDelete(
      { _id: projectData },
      (projectData,
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
          console.log("Project Deleted!");
        }
      })
    )
    .sort({ _id: -1 });
});

app.post("/api/user/:id", (req, res) => {
  const usersData = req.params.id;
  console.log(usersData);

  invitationData
    .findByIdAndDelete(
      { _id: usersData },
      (usersData,
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
          console.log("User Deleted!");
        }
      })
    )
    .sort({ _id: -1 });
});

// sign in endpoints
app.post("/api/user-signin", async (req, res) => {
  const { email, accessCode } = req.body;

  const user = await invitationData.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Email doesnot match!" });
  }

  if (accessCode === user.accessCode) {
    console.log("User authenticated and logged in!");
    return res
      .status(200)
      .json({ message: "User authenticated and logged in!" });
  } else res.status(400).json({ message: "User not authenticated!" });
});

// task get and post endpoints
app.get("/api/tasks", (req, res) => {
  taskData
    .find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
    .sort({ _id: -1 });
});

app.post("/api/completed-tasks/:id", (req, res) => {
  const completedTask = req.params.id;

  taskData
    .findByIdAndUpdate(
      { _id: completedTask },
      { status: "completed" },
      (completedTask,
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      })
    )
    .sort({ _id: -1 });
});

app.post("/api/tasks", (req, res) => {
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

// schedules get and post endpoints
app.get("/api/schedules", async (req, res) => {
  scheduleData
    .find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
    .sort({ _id: -1 });
});

app.post("/api/schedules", (req, res) => {
  const dbTasks = req.body;

  scheduleData.create(dbTasks, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// invitation get and post endpoints
app.get("/api/invitations", (req, res) => {
  invitationData
    .find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
    .sort({ _id: -1 });
});

app.post("/api/invitations", (req, res) => {
  const dbTasks = req.body;

  invitationData.create(dbTasks, (err, data) => {
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
        to: data.email,
        subject: "New Invitation!",
        html: `<img src = 'https://i.ibb.co/wR4CkQ6/logo.png'> <br /><br /> <b> Access Code: </b> ${data.accessCode}. <br /><br /> Have a good day &#128512;`,
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
app.get("/api/walls", (req, res) => {
  wallData
    .find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
    .sort({ _id: -1 });
});

app.post("/api/walls", (req, res) => {
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
  console.log("App has started! Listening at:", port);
});
