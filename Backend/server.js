process.env.NOTE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserApp = require("./models/userAppModel");
const User = require("./models/userModel");
const { ObjectID } = require("mongodb");
const path = require("path");

// set up express

const app = express();
app.use(express.json());
app.use(cors());

//Start up the server
const Port = process.env.Port || 3001;

// set up express
mongoose.connect(
  process.env.MONGODB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("db connected");
  }
);

app.get("/confirmation/:token", async (req, res) => {
  try {
    const userJwt = req.params.token;
    const decodedUserId = jwt.verify(userJwt, process.env.JWT_SECRET).user;

    console.log(decodedUserId);
    await UserApp.update(
      { _id: new ObjectID(decodedUserId.id) },
      { $set: { verified: true } }
    );
    res.send("entraste");
  } catch (e) {
    res.send("Error");
  }
  return res.redirect(
    "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com"
  );
});

app.get("/confirmation/userapps/:token", async (req, res) => {
  try {
    const userJwt = req.params.token;
    const decodedUserId = jwt.verify(userJwt, process.env.JWT_SECRET).user;

    console.log(decodedUserId);
    await UserApp.update(
      { _id: new ObjectID(decodedUserId.id) },
      { $set: { verified: true } }
    );
    res.send("entraste");
  } catch (e) {
    res.send("Error");
  }
  return res.redirect(
    "http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com"
  );
});

//Include routes
app.use("/userapps", require("./uroutes/patientRoutes"));
app.use("/users", require("./uroutes/doctorRoutes"));

app.listen(Port, () => console.log("server listening of port" + Port));
