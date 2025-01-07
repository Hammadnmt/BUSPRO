const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETH_UNAME,
    pass: process.env.ETH_PASSWORD,
  },
});

const sendEmail = async (userEmail) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.ETH_UNAME, // sender address
      to: userEmail, // list of receivers
      subject: "BUSPRO Ticket Confirmation ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<p>Ticket has been Confirmed. Be on time, mah nigg</p>", // html body
    });
    if (!info) {
      throw new Error("Problem while sending Email to Use");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendEmail;
