const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  {
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: "onlyfreelance.supp@mail.ru",
      pass: "xj4aUHWzQAUSMreY71ba",
    },
  },
  {
    from: "Freelancer <onlyfreelance.supp@mail.ru>",
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log(info);
  });
  transporter.close();
};

module.exports = mailer;
