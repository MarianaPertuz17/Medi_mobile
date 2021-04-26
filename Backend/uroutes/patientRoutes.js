const router = require("express").Router();
const UserApp = require("../models/userAppModel");
const ClinicHistory = require("../models/clinicHistory");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const nodemailer = require("nodemailer");
const { ObjectID } = require("mongodb");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    let {
      email,
      password,
      displayName,
      userName,
      lastName,
      sex,
      bornDate,
      ocupation,
      country,
      city,
      currentCity,
      address,
      phone,
      pastSurgery,
      contactName,
      contactLastName,
      contactPhone,
      docuId,
      minPatientDiastolicPressure,
      maxPatientDiastolicPressure,
      minPatientSystolicPressure,
      maxPatientSystolicPressure,
      minDiastolicPressure,
      maxDiastolicPressure,
      minSystolicPressure,
      maxSystolicPressure,
    } = req.body;

    if (email) {
      const existingUser = await ClinicHistory.findOne({ email: email });
      if (existingUser)
        return res.json("Ya existe una cuenta con este correo electrónico");
    }
    if (password) {
      if (password.length < 5)
        return res.json("La contraseña debe tener más de 5 carácteres.");
    }

    if (
      !email ||
      !password ||
      !displayName ||
      !lastName ||
      !sex ||
      !bornDate ||
      !ocupation ||
      !country ||
      !currentCity ||
      !phone
    )
      return res.json("Faltan campos por llenar");
    //Encriptación de contraseña
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //Encriptación de contraseña

    let numero = email.indexOf("@");
    let emailCortado = email.substr(0, numero);

    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 5);

    const newUser = new UserApp({
      displayName: emailCortado,
      lastName,
      docuId,
      email,
      password: passwordHash,
      minPatientDiastolicPressure,
      maxPatientDiastolicPressure,
      minPatientSystolicPressure,
      maxPatientSystolicPressure,
      minDiastolicPressure,
      maxDiastolicPressure,
      minSystolicPressure,
      maxSystolicPressure,
    });
    await newUser.save(); //currently working

    //Creación historia clínica
    const newClinicHistory = new ClinicHistory({
      displayName,
      lastName,
      sex,
      bornDate,
      ocupation,
      country,
      city,
      currentCity,
      address,
      phone,
      pastSurgery,
      contactName,
      contactLastName,
      contactPhone,
      docuId,
      email: email,
    });
    await newClinicHistory.save();

    //Envío de correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
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
        const url = `http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/confirmation/userapps/${token}`;
        const output = `
          <h2>Haz clic en el siguiente link para activar tu cuenta</h2>
          <p>http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/confirmation/userapps/${token}></p>
           <p><b>Usuario: </b>${email}</p>
      <p><b>Contraseña: </b>${password}</p>
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//LOGIN
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

router.get("/stadisticas", async (req, res) => {
  const patients = await UserApp.find();
  res.json({
    users: patients,
  });
});

//UPDATE STATES
router.post("/updatestate", async (req, res) => {
  const {
    heartFreq,
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
  currentDate.setDate(currentDate.getDate());
  currentDate.setHours(currentDate.getHours() - 5);
  let oneJan = new Date(currentDate.getFullYear(), 0, 1);

  // calculating number of days in given year before a given date
  let numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0
  let result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);

  //HEART FREQUENCY UPDATE
  if (heartFreq.trim() !== "") {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicHeartFreq: { heartFreq: heartFreq, date: currentDate },
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

  //PRESSURE UPDATE
  if (systolicPressure.trim() !== "" && diastolicPressure.trim() !== "") {
    await UserApp.update(
      { _id: new ObjectID(userID) },
      {
        $push: {
          historicPressure: {
            diastolicPressure: diastolicPressure,
            systolicPressure: systolicPressure,
            date: currentDate,
            condition: conditions,
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

router.route("/clinica").get((req, res) => {
  ClinicHistory.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/", auth, async (req, res) => {
  const user = await UserApp.findById(req.user);
  res.json({
    user,
  });
});

module.exports = router;
