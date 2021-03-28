const router = require("express").Router();
const UserApp = require("../models/userAppModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const nodemailer = require("nodemailer");
const { ObjectID } = require("mongodb");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    let {
      displayName,
      docuId,
      lastName,
      email,
      password,
      passwordCheck,
      temperature,
      sugarLevel,
      diastolicpressure,
      systolicPressure,
      condition,
      weight,
    } = req.body;

    //Validation

    //encrypting password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 5);

    const newUser = new User({
      lastName,
      docuId,
      email,
      password: passwordHash,
      displayName,
      temperature,
      sugarLevel,
      pressure,
      weight,
      historicWeight: [{ weight: weight, date: currentDate }],
      historicDiastolicPressure: [
        { pressure: pressure, date: currentDate, condition: condition },
      ],
      historicSystolicPressure: [
        { pressure: pressure, date: currentDate, condition: condition },
      ],
      historicSugarLevel: [{ sugarLevel: sugarLevel, date: currentDate }],
      historicTemperature: [{ temperature: temperature, date: currentDate }],
    });
    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "medicinaparatodos.custom@gmail.com",
        pass: "proyectofinal123",
      },
    });

    jwt.sign(
      {
        user: {
          id: newUser.id,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 360000,
      },
      async (err, token) => {
        res.json({ token });
        const url = `http://localhost:3001/confirmation/${token}`;
        const output = `
          <h2>Haz clic en el siguiente link para activar tu cuenta</h2>
          <p>http://localhost:3001/confirmation/${token}</p>
          <p><b>NOTA: </b> El link expira en 30 minutos.</p>
          `;
        try {
          await transporter.sendMail({
            to: email,
            subject: "Confirma tu cuenta",
            html: output,
          });
          console.log(email);
        } catch (e) {
          console.log(e);
        }
      }
    );

    //Send confirmation email

    // send mail with defined transport object
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  // Validation
  if (!email || !password)
    return res.status(400).json({ msg: "faltan campos por llenar" });
  try {
    const user = await UserApp.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "No se encuentra registrada esta cuenta" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    const isVerified = user.verified;
    if (!isVerified && isMatch) {
      return res
        .status(400)
        .json({ msg: "No se encuentra verificada esta cuenta" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//To check if token is valid-tells if we are logged in

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await UserApp.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  console.log("jueputa");
  console.log(req.user);
  const user = await UserApp.findById(req.user);
  res.json({
    user,
  });
});

//UPDATE STATE

router.post("/updatestate", async (req, res) => {
  const {
    temperature,
    sugarLevel,
    systolicPressure,
    diastolicPressure,
    conditions,
    symptoms,
    weight,
    oxygenSat,
    userID,
  } = req.body;
  const user = await UserApp.findById(userID);

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 10);
  currentDate.setHours(currentDate.getHours() - 5);
  // // currentDate.setDate(currentDate.getDate() - 2);

  //find the year of the current date
  let oneJan = new Date(currentDate.getFullYear(), 0, 1);

  // calculating number of days in given year before a given date
  let numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0
  let result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);

  //TEMPERATURE UPDATE
  if (temperature.trim() !== "") {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicTemperature: { temperature: temperature, date: currentDate },
        },
      }
    );
  }

  //SUGAR LEVEL UPDATE
  if (sugarLevel.trim() !== "") {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicSugarLevel: { sugarLevel: sugarLevel, date: currentDate },
        },
      }
    );
  }

  //SYSTOLIC PRESSURE UPDATE
  if (systolicPressure.trim() !== "") {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicSystolicPressure: {
            pressure: systolicPressure,
            date: currentDate,
            condition: conditions,
          },
        },
      }
    );
  }

  //DIASTOLIC PRESSURE UPDATE
  if (diastolicPressure.trim() !== "") {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicDiastolicPressure: {
            pressure: diastolicPressure,
            date: currentDate,
            condition: conditions,
          },
        },
      }
    );
  }

  //CONDITION UPDATE
  if (conditions !== null) {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          conditions: {
            diastolicPressure: diastolicPressure,
            systolicPressure: systolicPressure,
            date: currentDate,
            condition: conditions,
          },
        },
      }
    );
  }

  //SYMPTOMS UPDATE
  if (symptoms !== null) {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          symtoms: {
            date: currentDate,
            symptoms: symptoms,
          },
        },
      }
    );
  }

  //WEIGHT UPDATE
  if (weight.trim() !== "") {
    const historicWeightLength = user.historicWeight.length;
    let newAverage;
    let counter = 0;
    let currentAvg;
    let intWeight = parseInt(weight);
    if (historicWeightLength === 0) {
      newAverage = intWeight;
      counter = 1;
    } else if (
      historicWeightLength > 0 &&
      user.historicWeight[historicWeightLength - 1].week === result
    ) {
      currentAvg = user.historicWeight[historicWeightLength - 1].currentAverage;
      const currentCounter =
        user.historicWeight[historicWeightLength - 1].counter;
      counter = currentCounter + 1;
      newAverage = (currentAvg * currentCounter + intWeight) / counter;
    } else if (
      historicWeightLength > 0 &&
      user.historicWeight[historicWeightLength - 1].week !== result
    ) {
      newAverage = intWeight;
      counter = 1;
    }
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicWeight: {
            weight: intWeight,
            week: result,
            date: currentDate,
            currentAverage: newAverage,
            counter,
          },
        },
      }
    );
  }
  res.send({ msg: "hello" });
});

module.exports = router;
