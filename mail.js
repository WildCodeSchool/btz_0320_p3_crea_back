const mailer = require("nodemailer");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { lastname, firstname, email, text, textarea } = req.body;

  try {
    const smtpTransport = mailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "eldora.block86@ethereal.email",
        pass: "KdKN8MmH1sD7mrQRYQ",
      },
    });

    const mail = await smtpTransport.verify();

    await smtpTransport.sendMail({
      from: `${lastname}${firstname}${email}`,
      to: '"Crea" <contact@crea-aquitaine.org>',
      subject: text,
      text: textarea,
      html: `<p> ${textarea} </p>`,
    });
    res.status(200).json({ mail });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
