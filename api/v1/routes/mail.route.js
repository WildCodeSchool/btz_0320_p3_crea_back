const mailer = require("nodemailer");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { lastname, firstname, email, text, textarea } = req.body;

  try {
    const smtpTransport = mailer.createTransport({
      service: "gmail",
      auth: {
        user: "crea.networking.aquitaine@gmail.com",
        pass: "Networking.64",
      },
    });
    const mail = await smtpTransport.verify();
    
    await smtpTransport.sendMail({
      from: `${lastname}${firstname}${email}`,
      to: '"Crea" <contact@crea-aquitaine.org>',
      subject: text,
      text: textarea,
      html: `<h3>Vous avez reçu un message de ${lastname} ${firstname} (${email}) de la plateforme CREA Networking :</h3>
      <p> ${textarea} </p>`,
    });
    res.status(200).json({ mail });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
