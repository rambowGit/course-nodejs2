const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function mailHandler(mailForm) {
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.stc",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'stepkin', // generated ethereal user
      pass: '' // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${mailForm.name} <${mailForm.email}>`, // sender address
    to: "stepkin.alexander@gmail.com", // list of receivers
    subject: "Hello from site✔", // Subject line
    text: mailForm.message, // plain text body
    html: `<b>${mailForm.message}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//mailHandler().catch(console.error);

module.exports = mailHandler;
