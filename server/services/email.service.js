const nodemailer = require("nodemailer");

async function sendEmail(receipt_email, amount) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: receipt_email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hi, Your payment of $${amount} was successfull`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return info;
}

module.exports = sendEmail;
