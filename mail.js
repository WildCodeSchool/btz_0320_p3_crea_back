const mailer = require("nodemailer");
const { hello } = require("./hello_template");
const { thanks } = require("./thanks_template");

const getEmailData = (to, name, template) => {
  let data = null;
  switch (template) {
    case "hello":
      data = {
        from: "Béatrice <schoolwilder385@gmail.com> ",
        to,
        subject: `Hello ${name}`,
        html: hello(),
      };
      break;

    case "thanks":
      data = {
        from: "Béatrice <schoolwilder385@gmail.com> ",
        to,
        subject: `Hello ${name}`,
        html: thanks(),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "schoolwilder385@gmail.com",
      pass: "pass123456*",
    },
  });

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent successfully");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
