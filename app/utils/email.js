const nodemailer = require("nodemailer");
const {renderFile} = require("ejs");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7d73d40e954c8a",
    pass: "dd02c2d9944e10",
  },
});

const sendEmail = async (receiver, subject, content) => {
  return new Promise((resolve, reject) => {
    renderFile(
      __dirname + "/../templates/otp.ejs",
      { receiver, content },
      (err, data) => {
        if (err) {
          console.log(err);
          reject(false)
        } else {
          console.log(data)
          console.log(receiver)
          const mailOptions = {
            from: "krati@appventurez.com",
            to: receiver,
            subject: subject,
            html: data,
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              reject(false)
            }
            console.log("Message sent: %s", info.messageId);
            resolve(true)
          });
        }
      }
    );
  })
  
};

module.exports = {
    sendEmail
}
