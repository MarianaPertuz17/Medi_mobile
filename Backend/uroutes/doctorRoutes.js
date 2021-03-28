const router = require("express").Router();
const User = require("../models/userModel");
const UserApp = require("../models/userAppModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const nodemailer = require("nodemailer");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    //Validation

    if (!email || !password || !passwordCheck || !displayName)
      return res.json("Por favor, complete todo los campos");
    if (password.length < 5)
      return res.json("La contraseña debe tener más de 5 carácteres.");
    if (password !== passwordCheck)
      return res.json("Las contraseñas no coinciden");

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.json("Ya existe una cuenta con este correo electrónico");

    //encrypting password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    await newUser.save();

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
        const url = `http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/`;
        const output = `
              <h2>Haz clic en el siguiente link para activar tu cuenta</h2>
              <p>http://ec2-18-218-144-116.us-east-2.compute.amazonaws.com/confirma></p>
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
// PUNTO DE REFERENCIA I
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  // Validation
  // if (!email || !password)
  //   return res.json("faltan campos por llenar");
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return res.json(user);
    }
    //PUNTO DE REFERENCIA II
    const payload = {
      user: {
        id: user.id,
      },
    };

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: 360000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    res.json({ error: err.message });
  }
});

//To check if token is valid-tells if we are logged in

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;
